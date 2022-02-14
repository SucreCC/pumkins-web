import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {WordsIndexComponent} from "./index/words-index.component";
import {WordsRoutingModule} from "./words-routing.module";
import {WordsAddComponent} from "./words-add/words-add.component";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";


const COMPONENT = [
  WordsIndexComponent,
  WordsAddComponent
];

const COMPONENT_IMPORT = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  WordsRoutingModule,
  NzUploadModule
]

// 用于存放共享组件
const COMPONENTS_NOROUNT = []

@NgModule({
  declarations: [
    ...COMPONENT,
  ],
    imports: [
        ...COMPONENT_IMPORT,
        NzIconModule,
        NzButtonModule,
        NzFormModule,
        NzInputModule,
    ],
  providers: [],
  exports: [],
  entryComponents: []
})
export class WordsModule {
}
