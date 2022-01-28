import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {IndexComponent} from "./index/index.component";
import {BlogComponent} from './blog/blog.component'

const routes: Routes = [
  {
    path: '', component: WelcomeComponent, data: {title: 'Welcome', name: 'Welcome'}
  },

  {
    path: 'index', component: IndexComponent, data: {title: 'Index', name: 'Index'}
  },
  {
    path: 'blog', component: BlogComponent, data: {title: 'Blog', name: 'Blog'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {
}
