import { getPostDataExt } from '@/utills/httpUtil';
import proxyApis from '@/const/global/proxy-apis';
import { ResultEntity } from '@/const/type';
import { Message, notBlankOrEmpty } from '@/utills/KitUtil';
import { LoadingBar } from '@varlet/ui';

export default {};
export const getHtml = async (url: string) => {
    if (!notBlankOrEmpty(url)) {
        Message.warning('未发现URL');
        return Promise.reject();
    }
    const res: ResultEntity = await getPostDataExt(proxyApis.getHtml, { path: url }).catch(
        (res) => {
            Message.error(res?.msg || '错误');
            LoadingBar.finish();
            return Promise.reject();
        }
    );
    return res?.data;
};
