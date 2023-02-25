import { getPostDataExt } from '@/utills/httpUtil';
import settingApis from '@/view/setting/const/setting-apis';
import { ResultEntity } from '@/const/type';
import { configStr2boolean } from '@/utills/KitUtil';

export type settings = { isShowHidden?: boolean };

export const getConfig: () => Promise<Awaited<settings>> = async () => {
    const ret: settings = {};
    const res: ResultEntity = await getPostDataExt(settingApis.listConfig, {});
    ret['isShowHidden'] = configStr2boolean(res?.data?.isShowHidden);
    return Promise.resolve(ret);
};
