import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RoutesModule} from "./routes/routes.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {DefaultInterceptor} from "./core";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzModalService} from "ng-zorro-antd/modal";
import {ShareModule} from "./share/share.module";
import {NzInputModule} from "ng-zorro-antd/input";
import {JWTInterceptor, SimpleInterceptor} from "@delon/auth";
import {GlobalConfigModule} from './global-config.module';


// #网络请求拦截器
const INTERCEPTOR_PROVIDES = [
  // { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
  // {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
];

import {StartupService} from './core';
import {Observable} from "rxjs";

export function StartupServiceFactory(startupService: StartupService): () => Observable<void> {
  return () => startupService.load(null);
}

const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  }
];


// #region default language
// 参考：https://ng-alain.com/docs/i18n
import {I18NService} from './core';
import {zhCN as dateLang} from 'date-fns/locale';
import {default as ngLang} from '@angular/common/locales/zh';
import {NZ_DATE_LOCALE, NZ_I18N, zh_CN as zorroLang} from 'ng-zorro-antd/i18n';
import {DELON_LOCALE, zh_CN as delonLang, ALAIN_I18N_TOKEN} from '@delon/theme';

const LANG = {
  abbr: 'zh',
  ng: ngLang,
  zorro: zorroLang,
  date: dateLang,
  delon: delonLang
};

// register angular
import {registerLocaleData} from '@angular/common';
import {NzMessageModule} from "ng-zorro-antd/message";
import {DelonACLModule} from "@delon/acl";

registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  {provide: LOCALE_ID, useValue: LANG.abbr},
  {provide: NZ_I18N, useValue: LANG.zorro},
  {provide: NZ_DATE_LOCALE, useValue: LANG.date},
  {provide: DELON_LOCALE, useValue: LANG.delon}
];
// #endregion

// #region i18n services

const I18NSERVICE_PROVIDES = [{provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false}];

// #endregion

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RoutesModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule,
    NzNotificationModule,
    ShareModule,
    NzInputModule,
    GlobalConfigModule.forRoot(),
    DelonACLModule.forRoot(),
    NzMessageModule
  ],
  providers: [...LANG_PROVIDES, ...I18NSERVICE_PROVIDES, ...INTERCEPTOR_PROVIDES, ...APPINIT_PROVIDES, NzModalService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
