import {Component, OnInit} from '@angular/core';
import {EditorConfig} from "../../../share/component/editor/editor-config/editor-config";
import {ServiceblogService} from "../blog-service.service";

@Component({
  selector: 'app--blog-write',
  templateUrl: './blog-write.component.html',
  styleUrls: ['./blog-write.component.scss']
})
export class BlogWriteComponent implements OnInit {

  constructor(public service: ServiceblogService) {
    this.service.showEdit = false;
    this.config = new EditorConfig({height: 'calc(100vh - 71px)'});
    this.markdown = '测试内容';

  }

  ngOnInit(): void {
  }

  /**
   * editor的配置参数信息
   */
  config: EditorConfig;

  /**
   * markdown的内容
   */
  markdown: string;


}
