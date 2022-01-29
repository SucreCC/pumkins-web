import { Component } from '@angular/core';
import { ServiceblogService } from '../blog/blog-service.service';
import {EditorConfig} from "../../share/component/editor/editor-config/editor-config";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  /**
   * editor的配置参数信息
   */
  config: EditorConfig;

  /**
   * markdown的内容
   */
  markdown: string;

  constructor(public service:ServiceblogService) {
    this.service.showEdit=false;
    this.config = new EditorConfig({height: 'calc(100vh - 71px)'});
    this.markdown = '测试内容';

  }
}
