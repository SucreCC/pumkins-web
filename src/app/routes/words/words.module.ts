import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from "@angular/common";
import {WordsIndexComponent} from "./index/words-index.component";
import {WordsRoutingModule} from "./words-routing.module";


const COMPONENT = [
  WordsIndexComponent
];

const COMPONENT_IMPORT = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  WordsRoutingModule
]

// 用于存放共享组件
const COMPONENTS_NOROUNT = []

@NgModule({
  declarations: [
    ...COMPONENT,
  ],
  imports: [
    ...COMPONENT_IMPORT
  ],
  providers: [],
  exports: [],
  entryComponents: []
})
export class WordsModule {
}
