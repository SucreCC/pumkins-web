import {NgModule} from '@angular/core';
import {RoutesRoutingModule} from './routes-routing.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {WelcomeComponent} from "./welcome/welcome.component";
import {IndexComponent} from "./index/index.component";

import {AboutComponent} from './about/about.component';
import {BlogDetailComponent} from './blog/blog-detail/blog-detail.component';

import {ServiceblogService} from './blog/data/blog-service.service';
import {RelayOnComponent} from './about/About-Components/relay-on/relay-on.component';
import {TopContentComponent} from './about/About-Components/top-content/top-content.component';


import {AppHeaderComponent} from './index/header/app-header.component';
import {HeaderMenuComponent} from './index/header/header-menu/header-menu.component';
import {AppFooterComponent} from './index/footer/app-footer.component';
import {HeaderContentComponent} from "./index/header/header-content/header-content.component";
import {AppBodyComponent} from "./index/body/app-body.component";
import {BrowserModule} from "@angular/platform-browser";



const COMPONENT = [
  WelcomeComponent,
  IndexComponent,
  IndexComponent,
  AboutComponent,
  BlogDetailComponent,
  RelayOnComponent,
  TopContentComponent,
  AppHeaderComponent,
  HeaderContentComponent,
  HeaderMenuComponent,
  AppFooterComponent,
  AppBodyComponent
];

const COMPONENT_IMPORT = [
  RoutesRoutingModule,
  CommonModule,
  NgbModule,
  BrowserModule
]

// 用于存放共享组件
const COMPONENTS_NOROUNT = []

@NgModule({
  declarations: [
    ...COMPONENT,
  ],
  imports: [
    ...COMPONENT_IMPORT
  ],
  providers: [ServiceblogService],
  exports: [
    WelcomeComponent
  ],
  entryComponents: []
})
export class RoutesModule {
}
