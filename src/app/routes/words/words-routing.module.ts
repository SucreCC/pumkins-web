import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WordsIndexComponent} from "./index/words-index.component";


const routes: Routes = [

  // {
  //   path: '',
  //   component: WordsIndexComponent,
  //   data: {title: 'words-index', name: 'WordsIndex'},
  //   children: [
  //     // {path: '', redirectTo: 'recent', pathMatch: 'full'},
  //     // {path: 'recent', component: BlogRecentComponent, data: {title: 'BlogRecent', name: 'BlogRecent'}},
  //   ]
  // },


  {
    path: '',
    component: WordsIndexComponent,
    data: {title: 'words-index', name: 'WordsIndex'},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordsRoutingModule {
}
