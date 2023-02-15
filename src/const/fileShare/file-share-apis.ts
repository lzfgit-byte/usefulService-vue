import { downloadFilePath, prefix } from '@/const/const-data';

export const fileShareApis = {
    listFileApi: `${prefix}/file/listFiles`,
    uploadFile: `${prefix}/file/uploadFile`,
    downloadFilebyPath: downloadFilePath,
};
export default fileShareApis;
