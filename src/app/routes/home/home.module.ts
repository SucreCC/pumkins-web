import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {BlogArticleComponent} from "./blog-article/blog-article.component";


const COMPONENT = [
  HomeComponent,
  BlogArticleComponent
];

const COMPONENT_IMPORT = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HomeRoutingModule,
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
  exports: [],
  entryComponents: []
})
export class HomeModule {
}
