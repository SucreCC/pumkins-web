import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutesRoutingModule } from './routes-routing.module';

import { WelcomeComponent } from "./welcome/welcome.component";
import { IndexComponent } from "./index/index.component";


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
    IndexComponent
  ],
  imports: [
    BrowserModule,
    RoutesRoutingModule
  ],
  providers: [],
  exports: [
    WelcomeComponent
  ],
  entryComponents: []
})
export class RoutesModule { }
