import { getPostDataExt } from '@/utills/httpUtil';
import proxyApis from '@/const/global/proxy-apis';
import { ResultEntity } from '@/const/type';

export default {};
export const getHtml = async (url: string) => {
    const res: ResultEntity = await getPostDataExt(proxyApis.getHtml, { path: url });
    if (res?.code === 500) {
        return Promise.reject();
    }
    return res?.data;
};
