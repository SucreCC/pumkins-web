import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {IndexComponent} from "./index/index.component";

const routes: Routes = [
  {
    path: '', component: WelcomeComponent, data: {title: 'Welcome', name: 'welcome'}
  },

  {
    path: 'index', component: IndexComponent, data: {title: 'Index', name: 'Index'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {
}
