/**
 * 常量
 */
const isMock = false;
const apiPrefix = isMock ? '' : 'frontkit/service';

export function genUrl(url: string, name?: string) {
  return {url: apiPrefix + url, name};
}

export const URLS: any = {
  employeeList: genUrl('/getUrlName', '获取url名称'),
};


export function getUrlName(url: string) {
  if (url) {
    for (let item in URLS) {
      /*IE不支持inclueds*/
      // if (url.includes(URLS[item].url)) {
      if (url.indexOf(URLS[item].url) !== -1) {
        return URLS[item].name;
      }
    }
  }
  return url;
}
