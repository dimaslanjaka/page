import CryptoJS from 'crypto-js';

export const md5 = (str: string) => CryptoJS.MD5(str).toString();
