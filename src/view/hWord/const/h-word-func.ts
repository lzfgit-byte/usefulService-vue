import { getPostDataExt } from '@/utills/httpUtil';
import hWordApis from '@/view/hWord/const/h-word-apis';
import { Message } from '@/utills/KitUtil';
import { LoadingBar } from '@varlet/ui';

export default {};

export const getHtmlInfo = async (html: string): any => {
    const res = await getPostDataExt(hWordApis.getHtmlInfo, { html }).catch((res) => {
        Message.error(res?.msg || '错误');
        LoadingBar.finish();
        return Promise.reject();
    });

    return res?.data;
};

export const getVideoInfo = async (html: string): any => {
    const res = await getPostDataExt(hWordApis.getVideoInfo, { html }).catch(() => {
        return Promise.reject();
    });
    return res?.data;
};
export const getImgInfoOnly = async (html: string): any => {
    const res = await getPostDataExt(hWordApis.getImgInfoOnly, { html }).catch(() => {
        return Promise.reject();
    });
    return res?.data;
};
export const getImgInfo = async (html: string): any => {
    const res = await getPostDataExt(hWordApis.getImgInfo, { html }).catch(() => {
        return Promise.reject();
    });
    return res?.data;
};
