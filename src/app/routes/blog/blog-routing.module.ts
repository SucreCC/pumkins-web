import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogWriteComponent} from "./blog-write/blog-write.component";
import {BlogComponent} from "./blog.component";
import {BlogRecentComponent} from "./blog-recent/blog-recent.component";
import {ArticleDetailComponent} from "./article/article-detail.component";


const routes: Routes = [

  {
    path: '',
    component: BlogComponent,
    data: {title: 'Blog', name: 'Blog'},
    children: [
      {path: '', redirectTo: 'recent', pathMatch: 'full'},
      {path: 'recent', component: BlogRecentComponent, data: {title: 'BlogRecent', name: 'BlogRecent'}},
      {
        path: 'article-detail',
        component: ArticleDetailComponent,
        data: {title: 'ArticleDetail', name: 'ArticleDetail'}
      },
    ]
  },

  {path: 'write', component: BlogWriteComponent, data: {title: 'BlogWrite', name: 'BlogWrite'}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
