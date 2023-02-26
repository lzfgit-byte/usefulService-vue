import { fileInfoEntity } from '@/view/fileShare/const/file-share-type';
import { SEPARATOR } from '@/const/const-data';
import { Snackbar } from '@varlet/ui';
import { useStore } from 'vuex';
import proxyApis from '@/const/global/proxy-apis';
const store = useStore();

export const wrapperFileSize = (size: number) => {
    const sizeLevel = ['B', 'K', 'M', 'G'];
    let count = 0;
    while (count < sizeLevel.length && size > 1024) {
        size = +(size / 1024).toFixed(0);
        count++;
    }
    return size + sizeLevel[count];
};

export const getCurrentRoutePath = () => {
    const location = window.location.href;
    const number = location.indexOf('/#/');
    return location.substring(number + 2);
};

export const isDir = (file: fileInfoEntity) => !file.fileType;

export const notBlankOrEmpty = (str: any) => str !== null && str !== undefined && str !== '';

export const getLastDir = (path: string) => {
    const dirs = path.split(SEPARATOR);
    return dirs[dirs.length - 1];
};

export const configStr2boolean = (str: string) => 'true' === str || '1' === str;

export const Message = Snackbar;

export const getProxyImgUrl = (url: string) => proxyApis.getImgByte + '?path=' + url;
export const getProxyVideoUrl = (url: string) => proxyApis.getVideoByte + '?path=' + url;
