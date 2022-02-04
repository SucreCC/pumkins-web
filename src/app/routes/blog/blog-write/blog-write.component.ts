import {Component, OnInit} from '@angular/core';
// import { CacheService } from '@delon/cache';
import Vditor from 'vditor';

class Blog {
  id: number = 0;
  image: string = '';
  heading: string = '';
  subHeading: string = '';
  blogDate: string = '';
  blogDetail: string = '';

  public constructor() {
    this.initProperties();
  }

  initProperties() {
    this.blogDate = new Date().toDateString();
  }
}

@Component({
  selector: 'app--blog-write',
  templateUrl: './blog-write.component.html',
  styleUrls: ['./blog-write.component.scss']
})

export class BlogWriteComponent implements OnInit {

  vditor: Vditor;
  // vditor 初始化时的配置
  option: IOptions = {
    mode: 'sv',
    height: 'auto',
    width: "100%",
    theme: 'classic',
    toolbarConfig: {
      pin: true,
    },
    preview: {
      markdown: {
        autoSpace: true,
        toc: true,
        mark: true,
      }
    },
    cache: {
      enable: true,
      after(markdown: string) {
      // 用于缓存markdown文件
      }

    },
    after: () => {
      this.blog = new Blog()
      this.blogDetail = 'Hello, Vditor + Angular!';
      this.vditor.setValue(this.blog.blogDetail);
    },
    input (md) {
    //  用户每输入一个字符时进行的操作
    },
  };

  blog: Blog;
  heading: string = '';
  blogDetail: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.vditor = new Vditor('vditor', this.option);
  }

  save() {
    this.blogDetail = this.vditor.html2md(this.vditor.getHTML())
    this.blog.blogDetail = this.blogDetail;
  }
}
