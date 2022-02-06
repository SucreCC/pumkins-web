import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ShareModule} from "../../share/share.module";
import {ServiceblogService} from "./data/blog-service.service";

import {BlogWriteComponent} from "./blog-write/blog-write.component";
import {BlogRoutingModule} from "./blog-routing.module";
import {BlogComponent} from "./blog.component";
import {BlogRecentComponent} from "./blog-recent/blog-recent.component";
import {MarkdownModule, MarkedOptions} from "ngx-markdown";
import {NzInputModule} from "ng-zorro-antd/input";





const COMPONENT = [
  BlogWriteComponent,
  BlogComponent,
  BlogRecentComponent
];

const COMPONENT_IMPORT = [
  CommonModule,
  NgbModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  ShareModule,
  BlogRoutingModule,
  NzInputModule,
]

// 用于存放共享组件
const COMPONENTS_NOROUNT = []

@NgModule({
  declarations: [
    ...COMPONENT,
  ],
  imports: [
    ...COMPONENT_IMPORT,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      }
    }),
  ],
  providers: [ServiceblogService],
  exports: [],
  entryComponents: []
})
export class BlogModule {
}
