import {Injectable, Injector} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase
} from "@angular/common/http";
import {mergeMap, Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {_HttpClient} from "@delon/theme";
// import {EncryptService} from "../../service/encrypt.service";


const CODEMESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    const urlPrefix = 'pumkins';
    let url = urlPrefix + req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.SERVER_URL + url;
    }

    const newReq = req.clone({url});
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理
        // if (event instanceof HttpResponseBase) return this.handleData(event);
        // 若一切都正常，则后续操作
        return of(event);
      }),
      // catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }

  // private handleData(ev: HttpResponseBase): Observable<any> {
  //   // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
  //   if (ev.status > 0) {
  //     this.injector.get(_HttpClient).end();
  //   }
  //   this.checkStatus(ev);
  //   // 业务处理：一些通用操作
  //   switch (ev.status) {
  //     case 200:
  //       // jwt token update
  //       const token = ev.headers.get('x-auth-token');
  //       if (token) {
  //         // console.log(token);
  //         let origin: ITokenModel = this.tokenServie.get();
  //         let newToken: ITokenModel = deepCopy(origin);
  //         newToken.token = token;
  //         // console.log(newToken);
  //         // jwt token 即将过期，更新
  //         this.tokenServie.set(newToken);
  //       }
  //       // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
  //       // 例如响应内容：
  //       //  错误内容：{ status: 1, msg: '非法参数' }
  //       //  正确内容：{ status: 0, response: {  } }
  //       // 则以下代码片断可直接适用
  //       // if (ev instanceof HttpResponse) {
  //       //   const body: any = ev.body;
  //       //   if (body && body.status !== 0) {
  //       // 统一错误输出
  //       // this.msg.error(body.errorMsg);
  //       // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
  //       // this.http.get('/').subscribe() 并不会触发
  //       // return throwError({});
  //       // }
  //       // else {
  //       // // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
  //       // return of(new HttpResponse(Object.assign(event, { body: body.response })));
  //       // 或者依然保持完整的格式
  //       // return of(ev);
  //       // }
  //       // }
  //       break;
  //     case 400:
  //       // request validate handle
  //       const errors = (ev as HttpErrorResponse).error;
  //       if (errors) {
  //         let errorMsg = '';
  //         if (errors instanceof Array) {
  //           for (const tmp of errors) {
  //             errorMsg += tmp.message;
  //           }
  //         } else {
  //           errorMsg = errors.message || errors;
  //         }
  //
  //         this.notification.error('错误信息', `${errorMsg}`);
  //       }
  //       break;
  //     case 401:
  //       const state = ev.headers.get('Access-State');
  //       if (state === 'unlogin') {
  //         // 清空 token 信息
  //         (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
  //         this.errorTip(`未登录或登录已过期，请重新登录。`, '/passport/login');
  //       } else if (state === 'SSO_EXIT') {
  //         (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).clear();
  //         this.errorTip(`您的账号已在另一地点登录，您已被迫下线！`, '/passport/login');
  //       } else {
  //         const errortext = CODEMESSAGE[ev.status] || ev.statusText;
  //         const operateName = getUrlName(ev.url);
  //         this.notification.error(`${operateName} 请求错误`, errortext);
  //       }
  //       break;
  //     case 510:
  //       // 清空加密规则
  //       this.encryptService.clearEncryptRule();
  //       this.notification.error(`请求错误`, '解密错误！请重新请求');
  //
  //       break;
  //     // case 403:
  //     // case 404:
  //     case 500:
  //       // this.goTo(`/exception/${ev.status}`);
  //       // 后端有可能重启，公钥和私钥就不匹配了。解密出错，清空加密规则，让其重新获取规则.
  //       // 目前仅登录使用加密，如果其他地方使用的话，按需修改该逻辑！！
  //       // 有可能出现，空指针异常也会500返回，并不是解密出错，这可能会影响到其他加密业务！！！
  //       this.encryptService.clearEncryptRule();
  //       break;
  //     default:
  //       console.log(ev);
  //       if (ev instanceof HttpErrorResponse) {
  //         console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', ev);
  //         return throwError(ev);
  //       }
  //       break;
  //   }
  //   return of(ev);
  // }
}
