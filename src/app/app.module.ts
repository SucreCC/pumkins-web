import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RoutesModule} from "./routes/routes.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {DefaultInterceptor} from "./core";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzModalService} from "ng-zorro-antd/modal";
import {ShareModule} from "./share/share.module";
import {NzInputModule} from "ng-zorro-antd/input";

registerLocaleData(en);

// #网络请求拦截器
const INTERCEPTOR_PROVIDES = [
  // { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
  {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
];

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
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}, ...INTERCEPTOR_PROVIDES, NzModalService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
