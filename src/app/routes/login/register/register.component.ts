import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {_HttpClient, SettingsService} from '@delon/theme';
import {HttpContext} from "@angular/common/http";
import {ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import {ReuseTabService} from "@delon/abc/reuse-tab";
import {StartupService} from "../../../core";
import {NzMessageService} from "ng-zorro-antd/message";
import {ITokenModel} from "@delon/auth/src/token/interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  constructor(
    public el: ElementRef,
    private fb: UntypedFormBuilder,
    public modalSrv: NzModalService,
    private http: _HttpClient,
    private settingService: SettingsService,
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    private startupSrv: StartupService,
    private message: NzMessageService,
    @Inject(DA_SERVICE_TOKEN)
    private tokenService: ITokenService,
    private router: Router,
  ) {
  }

  username: any;
  password: any;
  email: string;
  error: '';

  user = {
    username: null,
    password: null,
    email: null,
    icon: null
  }

  tokenInfo: ITokenModel = {
    token: null,
    expired: 0,
  };

  registerUrl: string = "/register";

  form: UntypedFormGroup = this.fb.group({
    username: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    password: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.email]],
  });


  ngOnInit() {
  }


  forgetPassword() {

  }

  toRegister() {
    this.disabledButtonFor3seconds();

    this.user.username = this.form.value.username;
    this.user.password = this.form.value.password;
    this.user.email = this.form.value.email;

    // @ts-ignore
    this.user.icon = this.settingService.getUser().icon;


    // 必须要让 params 为null， 才能出现让post请求不只是返回 response 的 body，而是返回整个response对象
    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此加上 `ALLOW_ANONYMOUS` 表示不触发用户 Token 校验
    this.http.post(this.registerUrl, this.user,
      null,
      {
        observe: 'response',
        responseType: 'json',

        context: new HttpContext().set(ALLOW_ANONYMOUS, true)
      }).subscribe(resp => {
      if (resp.body.status === 0) {
        let user = resp.body.data;

        if (user === null) {
          this.message.error("username or password is exist");
        }

        if (user != null) {
          // 清空路由复用信息
          this.reuseTabService.clear();
          this.tokenInfo.token = resp.headers.get('Authorization');
          this.tokenInfo.expired = +new Date() + 1000 * 60 * 60 * 2;
          this.tokenService.set(this.tokenInfo);

          this.startupSrv.loadUser(user).subscribe(() => {
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
    this.el.nativeElement.querySelector('.login-button').style.backgroundColor = 'grey';
    this.el.nativeElement.querySelector('.login-button').disabled = true;
    setTimeout(() => {
      this.el.nativeElement.querySelector('.login-button').style.backgroundColor = '#ff7300';
      this.el.nativeElement.querySelector('.login-button').disabled = false;
    }, 2000);

  }

}
