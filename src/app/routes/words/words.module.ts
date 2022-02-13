import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from "@angular/common";
import {WordsIndexComponent} from "./index/words-index.component";
import {WordsRoutingModule} from "./words-routing.module";
import {WordsAddComponent} from "./words-add/words-add.component";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzIconModule} from "ng-zorro-antd/icon";


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
  ],
  providers: [],
  exports: [],
  entryComponents: []
})
export class WordsModule {
}
