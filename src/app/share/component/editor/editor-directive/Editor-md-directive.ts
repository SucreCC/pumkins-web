import {AfterViewInit, Attribute, Directive, EventEmitter, Input, Output} from '@angular/core';
import {EditorConfig} from '../editor-config/editor-config';

declare var editormd: any;
import $ from 'jquery';


@Directive({
  selector: '[appEditorMd]'
})
export class EditorMdDirective implements AfterViewInit {
  /**
   * 配置选项
   */
  @Input() editormdConfig: EditorConfig;
  /**
   * 发射器, markdown 文本
   */
  @Output() onEditorChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * editormd编辑器
   */
  editor: any;

  constructor(@Attribute('id') private id: string) {
  }

  ngAfterViewInit(): void {
    //可以调用editor中的方法
    this.editor = editormd(this.id, this.editormdConfig); // 创建编辑器
    // 当编辑器内容改变时，触发textarea的change事件
    this.editor.on('change',  () => {
      this.onEditorChange.emit(this.getMarkdown());
    });
  }

  getMarkdown() {
    return this.editor.getMarkdown();
  }

  getHtml() {
    return $('.editormd-preview').html();
  }
}
