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

export const isDir = (path: string) => path.indexOf('.') === -1;

export const notBlankOrEmpty = (str: any) => str !== null && str !== undefined && str !== '';
