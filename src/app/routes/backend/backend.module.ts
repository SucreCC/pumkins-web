import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from "@angular/common";
import {BackendRoutingModule} from "./backend-routing.module";
import {UserCenterComponent} from "./user-center/user-center.component";
import {BackendManageComponent} from "./backend-manage/backend-manage.component";


const COMPONENT = [
  UserCenterComponent,
  BackendManageComponent
];

const COMPONENT_IMPORT = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  BackendRoutingModule
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
    exports: []
})
export class BackendModule {
}
