import {Component, OnDestroy, OnInit} from '@angular/core';
import Vditor from 'vditor';
import {URLS} from "../../../share";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {_HttpClient, ModalHelperOptions} from '@delon/theme';
import {BlogSaveComponent} from "../blog-save/blog-save.component";
import { ModalHelper } from '@delon/theme';

class Blog {
  id: number = 0;
  img: string = '';
  title: string = '';
  blogDescribe: string = '';
  createDate: string = '';
  updateDate: string = '';
  content: any = '';

  public constructor() {
    this.initProperties();
  }

  initProperties() {
    if (this.createDate === null) {
      this.createDate = new Date().toDateString();
    }
    this.updateDate = new Date().toDateString();
  }
}

@Component({
  selector: 'app--blog-write',
  templateUrl: './blog-write.component.html',
  styleUrls: ['./blog-write.component.scss']
})

export class BlogWriteComponent implements OnInit, OnDestroy {

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
      this.vditor.setValue(this.content);
    },
    input(md) {
      localStorage.setItem("oldMarkdown", md);
    },
  };

  title: string = '';
  content: any = '';
  options: ModalHelperOptions = {
    /** 大小；例如：lg、600，默认：`lg` */
    size: 1200
  };

  constructor(public http: _HttpClient,
              private notification: NzNotificationService,
              private modalHelper: ModalHelper) {
  }

  ngOnInit(): void {
    this.vditor = new Vditor('vditor', this.option);

    // 保证刷新时缓存还在
    if (localStorage.getItem("oldMarkdown") != null) {
      this.content = localStorage.getItem("oldMarkdown")
    }
  }

  ngOnDestroy(): void {
    // 离开本页面时清除缓存
    localStorage.removeItem("oldMarkdown");
  }

  save(): boolean {
    this.content = this.vditor.html2md(this.vditor.getHTML())
    const blog = new Blog;
    blog.content = this.content;
    blog.title = this.title;

    if (!this.title) {
      this.notification.create("error", "错误", '请输入博客标题!'
      );
      return false;
    }

    if (this.content === null) {
      this.notification.create("error", "错误", '请输入博客内容!'
      );
      return false;
    }

    this.modalHelper.createStatic(BlogSaveComponent, this.options)
      .subscribe(channel => {

      });

    this.http.post(URLS.saveBlog.url, blog).subscribe(res => {
      if (res.data.status === 0) {
      }
    })
    return true;
  }
}
