export interface ResultEntity {
    code: number;
    data?: any;
    msg: string;
}

/**
 *     private String name;
 *     private String url;
 *     private String path;
 *     private String base64Data;
 */
export type ImageInfoEntity = {
    name?: string;
    url?: string;
    path?: string;
    base64Data?: string;
};
export type playVideoInType = { videoSrc: string; title: string };
export type compoentFunc = { playVideo: (data: playVideoInType) => void };
