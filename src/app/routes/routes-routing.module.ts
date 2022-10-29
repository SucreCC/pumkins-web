import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {IndexComponent} from "./layout/index.component";
import {AboutComponent} from './about/about.component';
import {HomeComponent} from "./home/home.component";


const routes: Routes = [

  {
    path: '', component: IndexComponent, data: {title: 'Index', name: 'Index'},

    children: [
      { path: 'index', redirectTo: '/home', pathMatch: 'full' },

      {
        path: 'home', component: HomeComponent, data: {title: 'Home', name: 'Home'},
      },

      { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },

      {
        path: 'about', component: AboutComponent, data: {title: 'About', name: 'About'}
      }

    ]


  },

  // {
  //   path: '', component: WelcomeComponent, data: {title: 'Welcome', name: 'Welcome'}
  // },

  // {
  //   path: 'layout', component: IndexComponent, data: {title: 'Index', name: 'Index'},
  // },
  //
  // { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  //
  // {
  //   path: 'about', component: AboutComponent, data: {title: 'About', name: 'About'}
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {
}
