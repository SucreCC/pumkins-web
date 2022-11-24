import {NgModule} from '@angular/core';
import {RoutesRoutingModule} from './routes-routing.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {WelcomeComponent} from "./welcome/welcome.component";
import {IndexComponent} from "./layout/index.component";
import {AboutComponent} from './about/about.component';
import {ServiceblogService} from './blog/data/blog-service.service';
import {RelayOnComponent} from './about/About-Components/relay-on/relay-on.component';
import {TopContentComponent} from './about/About-Components/top-content/top-content.component';
import {AppHeaderComponent} from './layout/header/app-header.component';
import {HeaderMenuComponent} from './layout/header/header-menu/header-menu.component';
import {AppFooterComponent} from './layout/footer/app-footer.component';
import {HeaderContentComponent} from "./layout/header/header-content/header-content.component";
import {AppBodyComponent} from "./layout/body/app-body.component";
import {BrowserModule} from "@angular/platform-browser";
import {HomeModule} from "./layout/home/home.module";
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {RegisterComponent} from "./login/register/register.component";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {ForgetPasswordComponent} from "./login/forget-password/forget-password.component";
import {DelonACLModule} from "@delon/acl";
import {EllipsisModule} from "@delon/abc/ellipsis";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzIconModule} from "ng-zorro-antd/icon";



const COMPONENT = [
  WelcomeComponent,
  IndexComponent,
  IndexComponent,
  AboutComponent,
  RelayOnComponent,
  TopContentComponent,
  AppHeaderComponent,
  HeaderContentComponent,
  HeaderMenuComponent,
  AppFooterComponent,
  AppBodyComponent,
  LoginComponent,
  RegisterComponent,
  ForgetPasswordComponent
];

const COMPONENT_IMPORT = [
  RoutesRoutingModule,
  CommonModule,
  NgbModule,
  BrowserModule,
  HomeModule,
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
]

// 用于存放共享组件
const COMPONENTS_NOROUNT = []

@NgModule({
    declarations: [
        ...COMPONENT,
    ],
  imports: [
    ...COMPONENT_IMPORT,
    NzFormModule,
    NzInputModule,
    NzAlertModule,
    DelonACLModule,
    EllipsisModule,
    NzDropDownModule,
    NzIconModule
  ],
    providers: [ServiceblogService],
    exports: [
        WelcomeComponent,
        AppHeaderComponent
    ]
})
export class RoutesModule {
}
