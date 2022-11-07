import {Component, ElementRef, Inject, Injector, OnInit} from '@angular/core';
import {_HttpClient, TitleService} from '@delon/theme';
import {NzModalService} from "ng-zorro-antd/modal";
import {ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService, TokenService} from '@delon/auth';
import {HttpContext} from "@angular/common/http";
import {ReuseTabService} from "@delon/abc/reuse-tab";
import {Router} from "@angular/router";
import {ITokenModel} from "@delon/auth/src/token/interface";
import {StartupService} from "../../core";
import {NzMessageService} from 'ng-zorro-antd/message';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

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
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    private startupSrv: StartupService,
    private message: NzMessageService,
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
      }).subscribe(resp => {
      if (resp.body.status === 0) {
        let user = resp.body.data;

        // this.notification.error("login error","username or password is not correct");

        if (user === null) {
          this.message.error("username or password is not correct");
        }

        if (user != null) {
          // 清空路由复用信息
          this.reuseTabService.clear();
          this.tokenInfo.token = resp.headers.get('Authorization');
          this.tokenInfo.expired = +new Date() + 1000 * 60 * 60 * 2;
          this.tokenService.set(this.tokenInfo);

          this.startupSrv.load(user).subscribe(() => {
            let url = this.tokenService.referrer!.url || '/';
            if (url.includes('/passport')) {
              url = '/';
            }
            this.router.navigateByUrl(url);
          });

        }
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

  ngOnInit(): void {
    // this.titleService.suffix = 'login';
  }
}
