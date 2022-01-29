import {NgModule} from '@angular/core';
import {EditorMdDirective} from './component/editor/editor-directive/Editor-md-directive';
import {EditorMarkdownComponent} from "./component/editor/editor-markdown/editor-markdown.component";
import {FormsModule} from '@angular/forms';

const DIRECTIVES: any = [EditorMdDirective];

const COMPONENTS: any = [EditorMarkdownComponent];

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
