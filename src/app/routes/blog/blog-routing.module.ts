import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogWriteComponent} from "./blog-write/blog-write.component";
import {BlogComponent} from "./blog.component";


const routes: Routes = [

  {
    path: '',
    component: BlogComponent,
    data: {title: 'Blog', name: 'Blog'},
    children: [
      {path: 'write', component: BlogWriteComponent, data: {title: 'BlogWrite', name: 'BlogWrite'}}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
