import { getPostDataExt } from '@/utills/httpUtil';
import proxyApis from '@/const/global/proxy-apis';
import { ResultEntity } from '@/const/type';
import { Message, notBlankOrEmpty } from '@/utills/KitUtil';

export default {};
export const getHtml = async (url: string) => {
    if (!notBlankOrEmpty(url)) {
        Message.warning('未发现URL');
        return Promise.reject();
    }
    const res: ResultEntity = await getPostDataExt(proxyApis.getHtml, { path: url });
    if (res?.code === 500) {
        return Promise.reject();
    }
    return res?.data;
};
