import {Component, OnDestroy, OnInit} from '@angular/core';
import Vditor from 'vditor';
import {URLS} from "../../../share";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {_HttpClient} from '@delon/theme';

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
  modalVisible: boolean = false;

  constructor(public http: _HttpClient, private notification: NzNotificationService) {
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

    if (!this.content) {
      this.notification.create("error", "错误", '请输入博客内容!'
      );
      return false;
    }

    this.http.post(URLS.saveBlog.url, blog).subscribe(res => {
      if (res.data.status === 0) {
      }
    })
    return true;
  }
}
