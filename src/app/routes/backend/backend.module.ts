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
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzNoAnimationModule} from "ng-zorro-antd/core/no-animation";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {EditBlogComponent} from "./edit-blog/edit-blog.component";


const COMPONENT = [
  UserCenterComponent,
  BackendManageComponent,
  IndexComponent,
  AddBlogComponent,
  FavouriteBlogComponent,
  EditBlogComponent
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
    NzDrawerModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzDatePickerModule,
    NzRadioModule,
    NzUploadModule,
    NzIconModule,
    NzModalModule,
    NzNoAnimationModule,
    NzTagModule,
    NzSwitchModule,
  ],
    providers: [],
    exports: []
})
export class BackendModule {
}
