import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutesRoutingModule } from './routes-routing.module';

import { WelcomeComponent } from "./welcome/welcome.component";
import { IndexComponent } from "./index/index.component";


import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BlogComponent } from './index/blog/blog.component';
import { AboutComponent } from './index/about/about.component';
import { BlogDetailComponent } from './index/blog/blog-detail/blog-detail.component';

import { ServiceblogService } from './index/blog/blog-service.service';
import { RelayOnComponent } from './index/about/About-Components/relay-on/relay-on.component';
import { TopContentComponent } from './index/about/About-Components/top-content/top-content.component';


import { BannerComponent } from './index/shared/banner/banner.component';
import { BannerNavigationComponent } from './index/shared/banner-navigation/banner-navigation.component';
import { FooterComponent } from './index/shared/footer/footer.component';
import {BannerContentComponent} from "./index/shared/banner-content/banner-content.component";


const COMPONENT =[
  WelcomeComponent,
  IndexComponent
];

// 用于存放共享组件
const COMPONENTS_NOROUNT = [

]

@NgModule({
  declarations: [
    COMPONENT,


    IndexComponent,
    BlogComponent,
    AboutComponent,
    BlogDetailComponent,
    RelayOnComponent,
    TopContentComponent,
    BannerComponent,
    BannerContentComponent,
    BannerNavigationComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RoutesRoutingModule,


    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ServiceblogService],
  exports: [
    WelcomeComponent
  ],
  entryComponents: []
})
export class RoutesModule { }
