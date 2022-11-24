import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCenterComponent} from "./user-center/user-center.component";
import {BackendManageComponent} from "./backend-manage/backend-manage.component";



const routes: Routes = [

  {
    path: 'user-center-center', component: UserCenterComponent, data: {title: 'UserCenter', name: 'UserCenter'}
  },

  {
    path: 'backend-manage', component: BackendManageComponent, data: {title: 'BackedManage', name: 'BackedManage'}
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule {
}
