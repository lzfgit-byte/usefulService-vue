import { ResultEntity } from '@/const/reader/type';

export default {};
import axios, {AxiosRequestConfig} from 'axios';
axios.defaults.timeout = 16000;
axios.interceptors.request.use(
    (config) => {
        // 在发送请求之前做什么
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (response) => {
        return Promise.resolve(response);
    }
);
export const getPostData = (url: string, params: any) => {
    return axios.post(url, params);
};
export const getPostDataExt = async (url: string, params: any,option: AxiosRequestConfig<any>={}) => {
    const res: ResultEntity = await axios.post(url, params,option);
    if (res.code === 200) {
        return Promise.resolve(res);
    } else {
        return Promise.reject(res);
    }
};
export const getGetData = (url: string, params: any) => {
    return axios.get(url, params);
};
