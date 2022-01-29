import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ShareModule} from "../../share/share.module";
import {ServiceblogService} from "./blog-service.service";

import {BlogWriteComponent} from "./blog-write/blog-write.component";
import {BlogRoutingModule} from "./blog-routing.module";
import {BlogComponent} from "./blog.component";



const COMPONENT = [
  BlogWriteComponent,
  BlogComponent
];

const COMPONENT_IMPORT = [
  CommonModule,
  NgbModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  ShareModule,
  BlogRoutingModule
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
  exports: [],
  entryComponents: []
})
export class BlogModule {
}
