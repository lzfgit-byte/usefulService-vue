import { ResultEntity } from '@/const/type';

export default {};
import axios, { AxiosRequestConfig } from 'axios';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { stringify } from 'qs';
const client = axios.create({
    paramsSerializer: stringify,
    timeout: 16000,
    headers: { 'Content-Type': 'application/json' },
});
client.interceptors.request.use(
    (config) => {
        // 在发送请求之前做什么
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
client.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (response) => {
        return Promise.resolve(response);
    }
);
export const getPostDataExt = async (
    url: string,
    params: any = {},
    option: AxiosRequestConfig<any> = {}
) => {
    const res: ResultEntity = await client.post(url, params, option);
    if (res.code === 200) {
        return Promise.resolve(res);
    } else {
        return Promise.reject(res);
    }
};
export const getGetData = (url: string, params: any) => {
    return client.get(url, params);
};
