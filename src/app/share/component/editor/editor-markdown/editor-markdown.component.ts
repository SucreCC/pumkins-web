import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EditorConfig} from '../editor-config/editor-config';
import {EditorMdDirective} from '../editor-directive/Editor-md-directive';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'editor-markdown',
  templateUrl: './editor-markdown.component.html',
  styleUrls: ['./editor-markdown.component.scss']
})
export class EditorMarkdownComponent implements OnInit {

  /**
   * markdown文章内容表单控件
   */
  markdownForm: FormGroup;

  /**
   * 原先的markdown文档内容
   */
  private _oldMarkdownContent: string;

  /**
   * markdown编辑器的属性配置
   */
  @Input() conf: EditorConfig;


  @ViewChild(EditorMdDirective, {static: false})
  private editorMdDirective: EditorMdDirective;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.markdownForm = this.fb.group({
      markdown: [this._oldMarkdownContent, [Validators.required]]
    });
  }

  @Input() set oldMarkdownContent(value: string) {
    this._oldMarkdownContent = value;
    //markdownForm初始化了,先执行@Input在执行ngOnInit
    if (this.markdownForm) {
      this.markdownForm.patchValue({
        markdown: value
      });
    }
  }

  get markdown(): FormControl {
    return this.markdownForm.get('markdown') as FormControl;
  }

  /**
   * 同步属性内容
   * @param str 输入的markdown文档
   */
  syncModel(str: any): void {
    this.markdown.setValue(str);
  }

  /**
   * 判断是否修改过
   */
  get isDirtyMarkdown() {
    return this._oldMarkdownContent === this.markdownForm.value.markdown;
  }

  /**
   * 得到editor编辑器里面的值
   */
  getEditorMarkdownComponentValue(): {markdown: string, html: string} {
    let obj: any = this.markdownForm.value;
    obj.html = this.editorMdDirective.getHtml();
    return obj;
  }

}
