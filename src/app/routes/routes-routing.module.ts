import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {IndexComponent} from "./index/index.component";
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent, data: {title: 'Welcome', name: 'Welcome'}
  },

  {
    path: 'index', component: IndexComponent, data: {title: 'Index', name: 'Index'},
  },

  {path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)},

  {
    path: 'about', component: AboutComponent, data: {title: 'About', name: 'About'}
  },

  {
    path: 'words', loadChildren: () => import('./words/words.module').then(m => m.WordsModule)
  }

  // {
  //   path: 'words', component: WordsIndexComponent, data: {title: 'words', name: 'Words'}
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {
}
