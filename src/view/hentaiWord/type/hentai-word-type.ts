export interface mainHtml {
  type: string;
  coverUrl: string;
  jumpUrl: string;
  count: string;
  width: string;
  height: string;
  title: string;
}
//分页信息
export interface pageInfo {
  pageNumber: string;
  jumpUrl: string;
  isCurrent: boolean;
}
//tag 信息
export interface tags {
  tageName: string;
  jumpUrl: string;
  count: string;
}

export interface htmlInfo {
  mainHtml: [x: mainHtml];
  pageInfo: [x: pageInfo];
  tags: [x: tags];
}
//视频页面返回信息
export interface videoInfo {
  videoSrc: string;
  tite: string;
}
//图片页面 多图片是下方的信息
export interface miniThumb {
  isCurrent: boolean;
  coverUrl: string;
  number: string;
  name: string;
  jumpUrl: string;
}
//页面信息
export interface imgInfo {
  original: string;
  zipUrl: string;
  name: string;
  others?: [x: miniThumb];
}
/**
 * 提供给前端的数据格式
 */
export interface hentaiWordFunc {
  getHtmlAxios: (url: string) => Promise<string>;
  getImgBase64: (url: string) => Promise<string>;
  getHtmlInfo: (html: string) => Promise<htmlInfo>;
  getVideoInfo: (html: string) => Promise<videoInfo>;
  getImgInfo: (html: string) => Promise<imgInfo>;
  getImgInfoOnly: (html: string) => Promise<imgInfo>;
  removeCache: (url: string) => Promise<any>;
  removeCacheAll: () => void;
  loadImgFile: (url: string) => void;
  getImgBase64FromDisk: (url: string) => Promise<string>;
  getCacheDir: () => Promise<string>;
}
