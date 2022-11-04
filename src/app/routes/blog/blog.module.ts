import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ServiceblogService} from "./data/blog-service.service";

import {BlogWriteComponent} from "./blog-write/blog-write.component";
import {BlogRoutingModule} from "./blog-routing.module";
import {BlogComponent} from "./blog.component";
import {BlogRecentComponent} from "./blog-recent/blog-recent.component";
import {MarkdownModule, MarkedOptions} from "ngx-markdown";
import {BlogSaveComponent} from "./blog-save/blog-save.component";
import {CommonModule} from "@angular/common";






const COMPONENT = [
  BlogWriteComponent,
  BlogComponent,
  BlogRecentComponent,
  BlogSaveComponent
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
    exports: []
})
export class BlogModule {
}
