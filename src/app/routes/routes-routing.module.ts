import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {IndexComponent} from "./layout/index.component";
import {AboutComponent} from './about/about.component';
import {HomeComponent} from "./layout/home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {ForgetPasswordComponent} from "./login/forget-password/forget-password.component";
import {ACLGuard, ACLGuardType} from "@delon/acl";
import {ArticleDetailComponent} from "./blog/article/article-detail.component";


const routes: Routes = [

  {
    path: '', component: IndexComponent, data: {title: 'Index', name: 'Index'},

    children: [
      {
        path: '', component: HomeComponent, data: {title: 'Home', name: 'Home'},
      },

      {path: 'index', redirectTo: '/home', pathMatch: 'full', data: {title: 'Home', name: 'Home'}},

      {
        path: 'home', component: HomeComponent, data: {title: 'Home', name: 'Home'},
      },

      {path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)},

      {
        path: 'about',
        component: AboutComponent,
        canActivate: [ACLGuard],
        data: {
          title: 'About', name: 'About', guard: {
            role: ['normal'],
          } as ACLGuardType,
        },
      }

    ]


  },

  // {
  //   path: 'article-detail',
  //   component: ArticleDetailComponent,
  //   data: {title: 'ArticleDetail', name: 'ArticleDetail'}
  // },

  {
    path: 'login', component: LoginComponent, data: {title: 'Login', name: 'Login'}
  },

  {
    path: 'register', component: RegisterComponent, data: {title: 'Register', name: 'Register'}
  },

  {
    path: 'forget-password', component: ForgetPasswordComponent, data: {title: 'ForgetPassword', name: 'ForgetPassword'}
  }

  // {
  //   path: '', component: WelcomeComponent, data: {title: 'Welcome', name: 'Welcome'}
  // },

  // {
  //   path: 'layout', component: BlogArticleComponent, data: {title: 'Index', name: 'Index'},
  // },
  //
  // { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  //
  // {
  //   path: 'about', component: ForgetPasswordComponent, data: {title: 'About', name: 'About'}
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {
}
