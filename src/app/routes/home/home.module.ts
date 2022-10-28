import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HomeRoutingModule} from "./home-routing.module";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home.component";






const COMPONENT = [
  HomeComponent

];

const COMPONENT_IMPORT = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HomeRoutingModule,
]

// 用于存放共享组件
const COMPONENTS_NOROUNT = []

@NgModule({
  declarations: [
    ...COMPONENT,
  ],
  imports: [
    ...COMPONENT_IMPORT,
  ],
  providers: [],
  exports: [],
  entryComponents: []
})
export class HomeModule {
}
