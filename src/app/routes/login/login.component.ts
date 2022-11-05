import {Component, ElementRef, Inject} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzModalService} from "ng-zorro-antd/modal";
import {ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService, TokenService} from '@delon/auth';
import {HttpContext} from "@angular/common/http";
import {ReuseTabService} from "@delon/abc/reuse-tab";
// import {StartupService} from "../../core";
import {Router} from "@angular/router";
import {ITokenModel} from "@delon/auth/src/token/interface";
import {StartupService} from "../../core";
import {AlainConfig} from "@delon/util/config";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  loginUrl: string = "/login"
  username: string;
  password: any;
  isDisabledButton: boolean = false;


  user = {
    username: null,
    password: null,
  };

  tokenInfo: ITokenModel = {
    token: null,
    expired: 0,
  };


  constructor(
    modalSrv: NzModalService,
    private router: Router,
    public el: ElementRef,
    private http: _HttpClient,
    @Inject(DA_SERVICE_TOKEN)
    private tokenService: ITokenService,
    // @Inject(ReuseTabService)
    // private reuseTabService: ReuseTabService,
    // private startupSrv: StartupService,
  ) {
  }


  toLogin() {
    this.disabledButtonFor3seconds();

    // 必须要让 params 为null， 才能出现让post请求不只是返回 response 的 body，而是返回整个response对象
    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此加上 `ALLOW_ANONYMOUS` 表示不触发用户 Token 校验
    this.http.post(this.loginUrl, this.user,
      null,
      {
        observe: 'response',
        responseType: 'json',
        context: new HttpContext().set(ALLOW_ANONYMOUS, true)
      }).subscribe(resp => {
      if (resp.body.status === 0) {

        // 清空路由复用信息
        // this.reuseTabService.clear();
        this.tokenInfo.token = resp.headers.get('Authorization');
        this.tokenInfo.expired = +new Date() + 1000 * 60 * 2;
        this.tokenService.set(this.tokenInfo);

        // this.startupSrv.load().subscribe(() => {
        //   let url = this.tokenService.referrer!.url || '/';
        //   if (url.includes('/passport')) {
        //     url = '/';
        //   }
        //   this.router.navigateByUrl(url);
        // });


        //
        // // 设置用户Token信息
        // // TODO: Mock expired value
        // user.expired = +new Date() + 1000 * 60 * 5;
        // user.token = jwtToken;
        // this.tokenService.set(user);
        // // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        // this.startupSrv.load().subscribe(() => {
        //   let url = this.tokenService.referrer!.url || '/';
        //   if (url.includes('/passport')) {
        //     url = '/';
        //   }
        //   this.router.navigateByUrl(url);
        // });


        // this.startupSrv.init().then(() => {
        //   let url = this.tokenService.referrer!.url || '/';
        //   /*IE不支持inclueds*/
        //   // if (url.includes('/passport')) {
        //   if (url.indexOf('/passport') !== -1) {
        //     url = '/';
        //   }
        //   if (url.indexOf('/message/template/send') !== -1) {
        //     url = '/message/template';
        //   }
        //   const nodeUrl = require('url');
        //   localStorage.setItem('uname', this.userName);
        //   this.http.get(URLS.getChatbot.url).subscribe(res => {
        //     // res.data.auditState.latitude!=null  由v1.0至v1.1版本chatbot增加新字段，为了提醒审核通过的老用户及时补充资料才增加的，后期可以删除
        //
        //     if (res.status === 0 && res.data && (res.data.auditState === 3 && res.data.latitude != null)) {
        //       url = '/';
        //       this.router.navigate([nodeUrl.parse(url).pathname], {queryParams: {flag: true}});
        //     } else {
        //       url = '/chatbot';
        //       this.router.navigate([nodeUrl.parse(url).pathname], {queryParams: {flag: true}});
        //     }
        //   });
        //
        // });
      }
    })


  }


  disabledButtonFor3seconds() {
    this.isDisabledButton = true;
    this.el.nativeElement.querySelector('.login-button').style.backgroundColor = 'grey';
    setTimeout(() => {
      this.el.nativeElement.querySelector('.login-button').style.backgroundColor = '#ff7300';
      this.isDisabledButton = false;
    }, 2000);
  }
}
