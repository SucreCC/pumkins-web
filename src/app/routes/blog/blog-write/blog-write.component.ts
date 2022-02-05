import {Component, OnDestroy, OnInit} from '@angular/core';
import Vditor from 'vditor';
import {URLS} from "../../../share";

import {_HttpClient} from '@delon/theme';

class Blog {
  id: number = 0;
  image: string = '';
  heading: string = '';
  subHeading: string = '';
  blogDate: string = '';
  blogDetail: any = '';

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

export class BlogWriteComponent implements OnInit , OnDestroy {

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
    after: () => {
      this.vditor.setValue(this.blogDetail);
    },
    input(md) {
      localStorage.setItem("oldMarkdown", md);
    },
  };

  heading: string = '';
  blogDetail: any = '';

  constructor(public http: _HttpClient) {
  }

  ngOnInit(): void {
    this.vditor = new Vditor('vditor', this.option);

    // 保证刷新时缓存还在
    if (localStorage.getItem("oldMarkdown") != null){
      this.blogDetail = localStorage.getItem("oldMarkdown")
    }
  }

  ngOnDestroy(): void {
    // 离开本页面时清除缓存
    localStorage.removeItem("oldMarkdown");
  }

  save() {
    this.blogDetail = this.vditor.html2md(this.vditor.getHTML())
    const blog = new Blog;
    blog.blogDetail = this.blogDetail;
    blog.heading = this.heading;

    this.http.post(URLS.saveBlog.url, blog).subscribe(res => {
      if (res.data.status === 0) {
      }
    })
  }
}
