import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Article, Title} from "../data/blog-type";
import {GlobalVariableService} from "../../../service/global-variable.service";
import Vditor from "vditor";
import {timeout, timer} from "rxjs";
import {_HttpClient} from "@delon/theme";
import {Blog} from "../../backend/add-blog/add-blog.component";

export class BlogComment {
  id: number;
  blogId: number;
  parentId: number;
  // childrenId: number;
  commentContent: string;
  createDate: any;
  updateDate: any;
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
              private http: _HttpClient,) {
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
  saveBlogCommentUrl: string = "/comment/save-blog-comment";

  content: any = "";
  innerHTML: string = '';
  outline: Title[] = [];
  tagTypes: string[] = ["H1", "H2", "H3"];
  blog: Blog = new Blog();
  blogComment: BlogComment = new BlogComment();

  commentList: any[] = [
    {name: '', description: '', subComment: ''},
    {name: '', description: '', subComment: ''},
    {name: '', description: '', subComment: ''}];

  comment: string = "This is submit comment"

  ngOnInit(): void {
    let blogId = this.route.snapshot.queryParams['id'];
    this.getBlogByBlogId(blogId);
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
    this.commentList = [...this.commentList, this.comment]
    console.log(this.commentList)
    this.buildBlogComment()
    this.http.post(this.saveBlogCommentUrl, this.blogComment).subscribe(resp => {
      if (resp.status === 0) {
        console.log(resp.data)
      }
    })

  }

  buildBlogComment() {
    this.blogComment.blogId = this.blog.id;
    this.blogComment.parentId = 0;
    this.blogComment.commentContent = this.comment;
    let date = new Date();
    this.blogComment.createDate = date;
    this.blogComment.updateDate = date;
  }

}
