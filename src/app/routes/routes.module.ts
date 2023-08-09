import {NgModule} from '@angular/core';
import {RoutesRoutingModule} from './routes-routing.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {WelcomeComponent} from "./welcome/welcome.component";
import {IndexComponent} from "./layout/index.component";
import {ServiceblogService} from './blog/data/blog-service.service';
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
import {BackendModule} from "./backend/backend.module";
import {MemoryComponent} from "./memory/memory.component";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzListModule} from "ng-zorro-antd/list";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzNoAnimationModule} from "ng-zorro-antd/core/no-animation";
import {NzTransferModule} from "ng-zorro-antd/transfer";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzSelectModule} from "ng-zorro-antd/select";
import {AboutComponent} from "./about/about.component";



const COMPONENT = [
  WelcomeComponent,
  IndexComponent,
  IndexComponent,
  AppHeaderComponent,
  HeaderContentComponent,
  HeaderMenuComponent,
  AppFooterComponent,
  AppBodyComponent,
  LoginComponent,
  RegisterComponent,
  ForgetPasswordComponent,
  MemoryComponent,
  AboutComponent,
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
  BackendModule
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
    NzIconModule,
    NzDrawerModule,
    NzTagModule,
    NzListModule,
    NzWaveModule,
    NzButtonModule,
    NzDatePickerModule,
    NzNoAnimationModule,
    NzTransferModule,
    NzModalModule,
    NzSwitchModule,
    NzCardModule,
    NzSelectModule
  ],
    providers: [ServiceblogService],
    exports: [
        WelcomeComponent,
        AppHeaderComponent
    ]
})
export class RoutesModule {
}
