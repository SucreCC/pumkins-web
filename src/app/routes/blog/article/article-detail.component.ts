import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Article, Title} from "../data/blog-type";
import {GlobalVariableService} from "../../../service/global-variable.service";
import Vditor from "vditor";
import {timeout, timer} from "rxjs";
import {_HttpClient, SettingsService} from "@delon/theme";
import {Blog} from "../../backend/add-blog/add-blog.component";
import {NzMessageService} from "ng-zorro-antd/message";

export class BlogComment {
  id: number;
  blogId: number;
  parentId: number;
  // childrenId: number;
  commentContent: string;
  createDate: any;
  updateDate: any;
  username: string;
  icon: string;
  numberOfThumbUp: number;
}

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.less']
})

export class ArticleDetailComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private router: Router,
              public el: ElementRef,
              private transferValueService: GlobalVariableService,
              private http: _HttpClient,
              private settingService: SettingsService,
              private message: NzMessageService,) {
  }

  vditor: Vditor;
  // vditor 初始化时的配置
  option: IOptions = {
    mode: 'sv',
    height: 'auto',
    // width: "100%",
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
      this.vditor.setValue(this.blog.markdown);
      this.innerHTML = this.vditor.getHTML();
    },
    input(md) {
      localStorage.setItem("oldMarkdown", md);
    },
  };

  getBlogUrl: string = "/blog/get-blog-by-id";
  getBlogCommentUrl: string = "/comment/get-blog-comment";
  saveBlogCommentUrl: string = "/comment/save-blog-comment";
  deleteBlogCommentUrl: string = "/comment/delete-blog-comment";
  thumbUpUrl: string = "/blog/thumb-up";

  content: any = "";
  innerHTML: string = '';
  outline: Title[] = [];
  tagTypes: string[] = ["H1", "H2", "H3"];
  blog: Blog = new Blog();
  blogComment: BlogComment = new BlogComment();
  user: any;
  reply: string = "";
  subReply: string = "";
  comment: string = ""

  commentList: any[] = [];

  ngOnInit(): void {
    let blogId = this.route.snapshot.queryParams['id'];
    this.getBlogByBlogId(blogId);
    this.getBlogComment(blogId);
    this.user = this.settingService.getUser();

    console.log(new Date().getMilliseconds() + Math.floor(Math.random() * 9) * 1000)
  }

  private getImgList() {
    let stringImgList = localStorage.getItem('articleImgList');
    if (stringImgList != null) {
      let imgList = stringImgList.split(',');
      this.transferValueService.imgList.next(imgList);
    }

  }

  private getOutline() {
    // 通过node节点获取目录结构
    let elementById = document.getElementById(`innerHTML-content`);

    // 子节点只有在页面渲染完毕后才能通过document获取到所以这里设置了一个延迟获取
    timer(500).subscribe(() => {

      // @ts-ignore
      let children = elementById.children;

      for (let i = 0; i < children.length; i++) {
        // @ts-ignore
        if (this.tagTypes.includes(children.item(i).nodeName)) {

          const id = "header-" + i;
          // @ts-ignore
          children.item(i).setAttribute("id", id);

          // @ts-ignore
          this.outline.push({
            // @ts-ignore
            id: id,
            // @ts-ignore
            name: children.item(i).innerHTML,
            // @ts-ignore
            level: Number(children.item(i).nodeName.substring(1, 2)),
            // @ts-ignore
            tagType: children.item(i).nodeName
          })
        }
      }
    })
  }


  ngOnDestroy(): void {
    this.transferValueService.imgList.next(this.transferValueService.originalImgList);
  }

  editArticle() {
    this.router.navigate(['/edit-blog'], {queryParams: {id: this.blog.id}})

  }

  jumpToContent(id: string) {
    window.location.hash = id;
  }

  private getBlogByBlogId(blogId: number) {
    this.http.get(this.getBlogUrl, {"blogId": blogId}).subscribe(resp => {
      if (resp.status === 0) {
        this.blog = resp.data;
        this.getImgList();
        this.vditor = new Vditor('vditor', this.option);
        this.getOutline();
      }
    })
  }

  saveComment() {
    this.buildBlogComment()
    this.commentList = [this.blogComment, ...this.commentList];
    this.comment = "";
    this.http.post(this.saveBlogCommentUrl, this.blogComment).subscribe(resp => {
    })
  }

  buildBlogComment() {
    this.blogComment.blogId = this.blog.id;
    this.blogComment.parentId = 0;
    this.blogComment.commentContent = this.comment;
    this.blogComment.username = this.user.username;
    this.blogComment.icon = this.user.icon;
    this.blogComment.numberOfThumbUp = 0;

  }

  private getBlogComment(blogId: any) {
    this.http.get(this.getBlogCommentUrl, {"blogId": blogId}).subscribe(resp => {
      if (resp.status === 0) {
        this.commentList = resp.data;
      }
    })
  }

  deleteComment(id: number) {
    this.http.get(this.deleteBlogCommentUrl, {"id": id}).subscribe(resp => {
      if (resp.status === 0) {
        this.getBlogComment(this.blog.id);
        this.message.success("delete comment was successful");
      }
    })
  }

  showReply(id: number) {
    let elementById = document.getElementById("comment" + "-" + id);
    // @ts-ignore
    elementById.hidden = !elementById.hidden;
  }

  replyComment(parentId: number, subCommentId: number, username: string) {
    let elementById = document.getElementById("comment" + "-" + subCommentId);
    // @ts-ignore
    elementById.hidden = !elementById.hidden;
    this.buildReplyComment(parentId, username)
    this.http.post(this.saveBlogCommentUrl, this.blogComment).subscribe(resp => {
      if (resp.status === 0) {
        this.getBlogComment(this.blog.id);
      }
    })
  }

  buildReplyComment(parentId: number, username: string) {
    this.blogComment.blogId = this.blog.id;
    this.blogComment.parentId = parentId;
    this.blogComment.commentContent = this.reply;
    this.blogComment.username = this.user.username + "@" + username.split("@")[0];
    this.blogComment.icon = this.user.icon;
    this.blogComment.numberOfThumbUp = 0;
  }
}
