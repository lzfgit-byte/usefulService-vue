import { getPostDataExt } from '@/utils/httpUtil';
import proxyApis from '@/const/global/proxy-apis';
import { ResultEntity } from '@/const/type';
import { IMessage, notBlankOrEmpty } from '@/utils/KitUtil';
import { LoadingBar } from '@varlet/ui';
import tempApis from '@/const/global/temp-apis';

export default {};
export const getHtml = async (url: string) => {
    if (!notBlankOrEmpty(url)) {
        IMessage.warning('未发现URL');
        return Promise.reject();
    }
    const res: ResultEntity = await getPostDataExt(proxyApis.getHtml, { path: url }).catch(
        (res) => {
            IMessage.error(res?.msg || '错误');
            LoadingBar.finish();
            return Promise.reject();
        }
    );
    return res?.data;
};
export const getSetting = async (key: string) => {
    const res: ResultEntity = await getPostDataExt(tempApis.getSaveData, { key: key }).catch(
        (res) => {
            IMessage.error(res?.msg || '错误');
            return Promise.reject();
        }
    );
    return res?.data;
};
export const setSetting = async (key: string, setting: string) => {
    const res: ResultEntity = await getPostDataExt(tempApis.doSaveData, {
        key: key,
        setting: setting,
    }).catch((res) => {
        IMessage.error(res?.msg || '错误');
        return Promise.reject();
    });
    return res?.data;
};
