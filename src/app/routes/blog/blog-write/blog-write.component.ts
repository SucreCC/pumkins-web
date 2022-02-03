import {Component, OnInit} from '@angular/core';
import {EditorConfig} from "../../../share/component/editor/editor-config/editor-config";
import {ServiceblogService} from "../data/blog-service.service";

import Vditor from 'vditor';

@Component({
  selector: 'app--blog-write',
  templateUrl: './blog-write.component.html',
  styleUrls: ['./blog-write.component.scss']
})
export class BlogWriteComponent implements OnInit {

  // constructor(public service: ServiceblogService) {
  //   this.service.showEdit = false;
  //   this.config = new EditorConfig({height: 'calc(100vh - 71px)'});
  //   this.markdown = '测试内容';
  //
  // }
  //
  // ngOnInit(): void {
  // }
  //
  // /**
  //  * editor的配置参数信息
  //  */
  // config: EditorConfig;
  //
  // /**
  //  * markdown的内容
  //  */
  // markdown: string;


  vditor: Vditor;

  ngOnInit(): void {
    this.vditor = new Vditor('vditor', {
      mode:'sv',
      height: 'auto',
      icon:'material',
      theme:'classic',
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      after: () => {
        this.vditor.setValue('Hello, Vditor + Angular!');
      }
    });
  }

  coverToJson(){
    this.vditor.exportJSON("")
  }

}
