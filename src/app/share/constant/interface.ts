/**
 * 常量
 */
const isMock = false;


export function genUrl(url: string, name?: string) {
  return {url: url, name};
}

export const URLS: any = {
//  blog
  saveBlog:genUrl('/blog/save','save blog')
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
