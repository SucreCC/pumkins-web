import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

const DIRECTIVES: any = [];

const COMPONENTS: any = [];

const COMPONENTS_NOROUNT: any = []

@NgModule({
  declarations: [
    ...DIRECTIVES,
    ...COMPONENTS
  ],
  imports: [FormsModule],
  providers: [],
  entryComponents: [COMPONENTS_NOROUNT],
  exports: [
    COMPONENTS
  ]
})
export class ShareModule {
}
