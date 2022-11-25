import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from "@angular/common";
import {BackendRoutingModule} from "./backend-routing.module";
import {UserCenterComponent} from "./user-center/user-center.component";
import {BackendManageComponent} from "./backend-manage/backend-manage.component";
import {IndexComponent} from "./index.component";
import {AddBlogComponent} from "./add-blog/add-blog.component";
import {NzButtonModule} from "ng-zorro-antd/button";
import {FavouriteBlogComponent} from "./favourite-blog/favourite-blog.component";
import {BlogArticleComponent} from "../layout/home/blog-article/blog-article.component";
import {HomeModule} from "../layout/home/home.module";


const COMPONENT = [
  UserCenterComponent,
  BackendManageComponent,
  IndexComponent,
  AddBlogComponent,
  FavouriteBlogComponent
];

const COMPONENT_IMPORT = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  BackendRoutingModule,
]

// 用于存放共享组件
const COMPONENTS_NOROUNT = []

@NgModule({
    declarations: [
        ...COMPONENT,
    ],
  imports: [
    ...COMPONENT_IMPORT,
    NzButtonModule,
    HomeModule,
  ],
    providers: [],
    exports: []
})
export class BackendModule {
}
