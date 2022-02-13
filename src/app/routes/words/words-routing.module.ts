import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WordsIndexComponent} from "./index/words-index.component";
import {WordsAddComponent} from "./words-add/words-add.component";


const routes: Routes = [

  {
    path: '',
    component: WordsIndexComponent,
    data: {title: 'words-index', name: 'WordsIndex'},
    children: [
      {path: '', redirectTo: 'words-add', pathMatch: 'full'},
      {path: 'words-add', component: WordsAddComponent, data: {title: 'WordsAdd', name: 'WordsAdd'}},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordsRoutingModule {
}
