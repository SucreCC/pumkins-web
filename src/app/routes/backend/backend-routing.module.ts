import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCenterComponent} from "./user-center/user-center.component";
import {BackendManageComponent} from "./backend-manage/backend-manage.component";
import {IndexComponent} from "./index.component";
import {AddBlogComponent} from "./add-blog/add-blog.component";
import * as path from "path";
import {FavouriteBlogComponent} from "./favourite-blog/favourite-blog.component";
import {title} from "process";


const routes: Routes = [

  {
    path: '', component: IndexComponent, data: {title: 'BackendIndex', name: 'Index'},


    children: [
      {
        path: 'user-center', component: UserCenterComponent, data: {title: 'UserCenter', name: 'UserCenter'},
        children: [
          {path: '', component: FavouriteBlogComponent, data: {title: 'FavouriteBlog', name: 'FavouriteBlog'}},
          {path: 'favourite-blog', component: FavouriteBlogComponent, data: {title: 'FavouriteBlog', name: 'FavouriteBlog'}}

        ]

      },
      {path: 'backend-manage', component: BackendManageComponent, data: {title: 'BackedManage', name: 'BackedManage'}},
      {path: 'add-blog', component: AddBlogComponent, data: {title: 'AddBlog', name: 'AddBlog'}},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule {
}
