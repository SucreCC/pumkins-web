import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ACLCanType, ACLService} from '@delon/acl';
import {ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService} from '@delon/theme';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {NzIconService} from 'ng-zorro-antd/icon';
import {Observable, zip, catchError, map} from 'rxjs';

import {ICONS} from '../../../style-icons';
import {ICONS_AUTO} from '../../../style-icons-auto';
import {I18NService} from '../i18n/i18n.service';
import {SetPageTitleService} from "../../service/set-page-title.service";
import {ITokenModel} from "@delon/auth/src/token/interface";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private router: Router,
    private setPageTitleService: SetPageTitleService,
    @Inject(DA_SERVICE_TOKEN)
    private tokenService: ITokenService,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }


  user = {
    id: -1,
    username: '',
    icon: '',
    email: '',
    role: 'normal',
  }

  username_prefix: string = "User#";
  icon_path_prefix: string = "assets/tmp/img/"
  icon_path_suffix: string = ".png"


  tokenInfo: ITokenModel = {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aW1lU3RhbXAiOjE2Njc3OTYzMzUsImlkIjoxNCwiZXhwIjoxNjY3ODAzNTM1LCJ1c2VybmFtZSI6Imxhb2RvbmdAbGFvZG9uZyJ9.0Hxj5G_G1n9tD4VG86WjPyzicEPE67XXgTI667jULzw',
    expired: 0,
  };

// for login register and forget password page
  loadUser(user: any): Observable<void> {
    const defaultLang = this.i18n.defaultLang;
    return zip(this.i18n.loadLangData(defaultLang), this.httpClient.get('assets/tmp/app-data.json')).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError(res => {
        console.warn(`StartupService.load: Network request failed`, res);
        // setTimeout(() => this.router.navigateByUrl(`/exception/500`));
        return [];
      }),
      map(([langData, appData]: [Record<string, string>, NzSafeAny]) => {

        // setting language data
        this.i18n.use(defaultLang, langData);

        // 应用信息：包括站点名、描述、年份
        this.settingService.setApp(appData.app);

        // 用户信息：包括姓名、头像、邮箱地址
        this.settingService.setUser(user);

        //ACL 设置用户角色
        this.aclService.setRole([user.role]);
        // console.log(this.aclService)

        // 初始化菜单
        // this.menuService.add(appData.menu);

        // 设置页面标题
        this.titleService.prefix = 'Pumkins';
        this.titleService.separator = ' | ';
        this.setPageTitleService.setTitle();

      })
    );
  }


  load(): Observable<void> {
    const defaultLang = this.i18n.defaultLang;

    return zip(this.i18n.loadLangData(defaultLang), this.httpClient.get('assets/tmp/app-data.json')).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError(res => {
        console.warn(`StartupService.load: Network request failed`, res);
        // setTimeout(() => this.router.navigateByUrl(`/exception/500`));
        return [];
      }),
      map(([langData, appData]: [Record<string, string>, NzSafeAny]) => {

        let userFromLocalStorage = JSON.parse(<string>localStorage.getItem('user'));

        // 首次进入时如果 浏览器缓存里没有用户信息的话就要设置一个访客用户
        if (userFromLocalStorage === null) {
          this.user.username = this.username_prefix + new Date().getTime();
          let iconNumber = Math.floor(Math.random() * (6 + 1));
          this.user.icon = this.icon_path_prefix + iconNumber + this.icon_path_suffix;
        }

        // 如果非访客登入的话， 沿用缓存中的用户
        if (userFromLocalStorage != null) {
          this.user= JSON.parse(<string>localStorage.getItem('user'));
        }


        // 用户信息：包括姓名、头像、邮箱地址
        this.settingService.setUser(this.user);

        //ACL 设置用户角色
        this.aclService.setRole([this.user.role]);


        // 如果没有token 就设置仿造token 每次刷新页面就
        let tokenInfo = this.tokenService.get();
        if (tokenInfo?.token != this.tokenInfo.token) {
          this.tokenInfo.token = tokenInfo?.token;
        }
        this.tokenInfo.expired = +new Date() + 1000 * 60 * 60 * 2;
        this.tokenService.set(this.tokenInfo);

        // setting language data
        this.i18n.use(defaultLang, langData);

        // 应用信息：包括站点名、描述、年份
        this.settingService.setApp(appData.app);

        // 初始化菜单
        // this.menuService.add(appData.menu);

        // 设置页面标题
        this.titleService.prefix = 'Pumkins';
        this.titleService.separator = ' | ';
        this.setPageTitleService.setTitle();

      })
    );
  }
}
