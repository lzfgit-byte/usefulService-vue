import { getPostDataExt } from '@/utils/httpUtil';
import hComicApis from '@/view/hcomic/const/18-comic-api';

export const getHomeInfo = async (html: string) => {
    const res = await getPostDataExt(hComicApis.getHomeInfo, { html }).catch(() => {
        return Promise.reject();
    });
    return res?.data;
};
