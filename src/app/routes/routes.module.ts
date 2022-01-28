import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutesRoutingModule } from './routes-routing.module';

import { WelcomeComponent } from "./welcome/welcome.component";
import { IndexComponent } from "./index/index.component";


import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';

import { ServiceblogService } from './blog/blog-service.service';
import { RelayOnComponent } from './about/About-Components/relay-on/relay-on.component';
import { TopContentComponent } from './about/About-Components/top-content/top-content.component';


import { HeaderComponent } from './index/header/header.component';
import { HeaderMenuComponent } from './index/header/header-menu/header-menu.component';
import { FooterComponent } from './index/footer/footer.component';
import {HeaderContentComponent} from "./index/header/header-content/header-content.component";


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
    HeaderComponent,
    HeaderContentComponent,
    HeaderMenuComponent,
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
