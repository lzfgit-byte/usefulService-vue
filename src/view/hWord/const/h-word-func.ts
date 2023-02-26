import { getPostDataExt } from '@/utills/httpUtil';
import hWordApis from '@/view/hWord/const/h-word-apis';

export default {};

export const getHtmlInfo = async (html: string): any => {
    const res = await getPostDataExt(hWordApis.getHtmlInfo, { html });
    if (res?.code === 500) {
        return Promise.reject();
    }
    return res?.data;
};

export const getVideoInfo = async (html: string): any => {
    const res = await getPostDataExt(hWordApis.getVideoInfo, { html });
    if (res?.code === 500) {
        return Promise.reject();
    }
    return res?.data;
};
export const getImgInfoOnly = async (html: string): any => {
    const res = await getPostDataExt(hWordApis.getImgInfoOnly, { html });
    if (res?.code === 500) {
        return Promise.reject();
    }
    return res?.data;
};
export const getImgInfo = async (html: string): any => {
    const res = await getPostDataExt(hWordApis.getImgInfo, { html });
    if (res?.code === 500) {
        return Promise.reject();
    }
    return res?.data;
};
