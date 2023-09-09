import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCenterComponent} from "./user-center/user-center.component";
import {BackendManageComponent} from "./backend-manage/backend-manage.component";
import {IndexComponent} from "./index.component";
import {AddBlogComponent} from "./add-blog/add-blog.component";
import * as path from "path";
import {FavouriteBlogComponent} from "./favourite-blog/favourite-blog.component";
import {title} from "process";
import {EditBlogComponent} from "./edit-blog/edit-blog.component";
import {ACLGuard, ACLGuardType} from "@delon/acl";


const routes: Routes = [

  {
    path: '', component: IndexComponent, data: {title: 'BackendIndex', name: 'Index'},


    children: [
      {
        path: 'user-center', component: UserCenterComponent, data: {title: 'UserCenter', name: 'UserCenter'},
        children: [
          {path: '', component: FavouriteBlogComponent, data: {title: 'FavouriteBlog', name: 'FavouriteBlog'}},
          {
            path: 'favourite-blog',
            component: FavouriteBlogComponent,
            data: {title: 'FavouriteBlog', name: 'FavouriteBlog'}
          }

        ]

      },
      {
        path: 'backend-manage',
        component: BackendManageComponent,
        canActivate: [ACLGuard],
        data: {
          title: 'BackedManage', name: 'BackedManage', guard: {
            role: ['host', 'user'],
          } as ACLGuardType,
        }
      },
      {
        path: 'add-blog', component: AddBlogComponent, canActivate: [ACLGuard], data: {
          title: 'AddBlog', name: 'AddBlog', guard: {
            role: ['host', 'user'],
          } as ACLGuardType,
        }
      },
      {
        path: 'edit-blog', component: EditBlogComponent, canActivate: [ACLGuard], data: {
          title: 'EditBlog', name: 'EditBlog', guard: {
            role: ['host', 'user'],
          } as ACLGuardType,
        }
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule {
}

