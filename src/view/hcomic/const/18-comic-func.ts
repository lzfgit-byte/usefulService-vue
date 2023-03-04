import { getPostDataExt } from '@/utils/httpUtil';
import hComicApis from '@/view/hcomic/const/18-comic-api';

export const getHomeInfo = async (html: string) => {
    const res = await getPostDataExt(hComicApis.getHomeInfo, { html }).catch(() => {
        return Promise.reject();
    });
    return res?.data;
};

export const getComicDetailInfo = async (html: string) => {
    const res = await getPostDataExt(hComicApis.getComicDetailInfo, { html }).catch(() => {
        return Promise.reject();
    });
    return res?.data;
};
export const getReaderInfos = async (html: string) => {
    const res = await getPostDataExt(hComicApis.getReaderInfos, { html }).catch(() => {
        return Promise.reject();
    });
    return res?.data;
};
export const getSearchInfo = async (html: string) => {
    const res = await getPostDataExt(hComicApis.getSearchInfo, { html }).catch(() => {
        return Promise.reject();
    });
    return res?.data;
};
