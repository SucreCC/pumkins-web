import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServiceblogService} from "./data/blog-service.service";

import {BlogWriteComponent} from "./blog-write/blog-write.component";
import {BlogRoutingModule} from "./blog-routing.module";
import {BlogComponent} from "./blog.component";
import {BlogRecentComponent} from "./blog-recent/blog-recent.component";
import {BlogSaveComponent} from "./blog-save/blog-save.component";
import {CommonModule} from "@angular/common";
import {ArticleDetailComponent} from "./article/article-detail.component";
import {EditorMdDirective} from "./config/editor-md.directive";
import {SafeHtmlPipe} from "./config/safe-htlm-pipe";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzInputModule} from "ng-zorro-antd/input";


const COMPONENT = [
  BlogWriteComponent,
  BlogComponent,
  BlogRecentComponent,
  BlogSaveComponent,
  ArticleDetailComponent
];

const COMPONENT_IMPORT = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  BlogRoutingModule,
]


// 用于存放共享组件
const COMPONENTS_NOROUNT = []

@NgModule({
  declarations: [
    ...COMPONENT,
    SafeHtmlPipe,
  ],
    imports: [...COMPONENT_IMPORT, NzCardModule, NzFormModule, NzSelectModule, NzDatePickerModule, NzInputModule],
  providers: [ServiceblogService],
  exports: []
})
export class BlogModule {
}
