import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {BlogArticleComponent} from "./blog-article/blog-article.component";
import {TagsComponent} from "./tags/tags.component";
import {FeaturedArticleComponent} from "./featured-article/featured-article.component";
import {NzIconModule} from "ng-zorro-antd/icon";
import {LinksComponent} from "./links/links.component";
import {WebInformationComponent} from "./web-information/web-information.component";
import {AdvertisementComponent} from "./advertisement/advertisement.component";


const COMPONENT = [
  HomeComponent,
  BlogArticleComponent,
  TagsComponent,
  FeaturedArticleComponent,
  LinksComponent,
  WebInformationComponent,
  AdvertisementComponent
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
        NzIconModule,
    ],
    providers: [],
  exports: [
    BlogArticleComponent,
    TagsComponent,
    FeaturedArticleComponent
  ]
})
export class HomeModule {
}
