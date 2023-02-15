export const getHentaiWordFunc = (inject: any) => {
  const getHtmlAxios: any = inject('getHtmlAxios');
  const getImgBase64: any = inject('getImgBase64');
  const getHtmlInfo: any = inject('getHtmlInfo');
  const getVideoInfo: any = inject('getVideoInfo');
  const getImgInfo: any = inject('getImgInfo');
  const getImgInfoOnly: any = inject('getImgInfoOnly');
  const removeCache: any = inject('deleteFile');
  const removeCacheAll: any = inject('clearCache');
  const loadImgFile: any = inject('loadImgFile');
  const getImgBase64FromDisk: any = inject('getImgBase64FromDisk');
  const getCacheDir: any = inject('getCacheDir');
  return {
    getHtmlAxios,
    getImgBase64,
    getHtmlInfo: getHtmlInfo,
    getVideoInfo: getVideoInfo,
    getImgInfo: getImgInfo,
    getImgInfoOnly: getImgInfoOnly,
    removeCache,
    removeCacheAll,
    loadImgFile,
    getImgBase64FromDisk,
    getCacheDir,
  };
};
