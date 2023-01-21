import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalVariableService} from "../../../../service/global-variable.service";
import {_HttpClient} from "@delon/theme";
import {Blog} from "../../../backend/add-blog/add-blog.component";

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.less']
})


export class BlogArticleComponent implements OnInit {

  getArticleBlogUrl: string = "/blog/article-blog"
  blogList: Blog[] = [];
  imgList: string[] = [];


  constructor(private router: Router,
              private transferValueService: GlobalVariableService,
              private http: _HttpClient,) {
  }


  showDetail(blog: Blog) {
    localStorage.setItem("articleImgList", blog.images.toString());
    this.router.navigate(['/blog/article-detail'], {queryParams: {id: blog.id, title: blog.title}})
  }

  ngOnInit(): void {
    this.http.get(this.getArticleBlogUrl).subscribe(resp => {
      if (resp.status === 0) {
        this.blogList = resp.data;
      }
    })
  }
}

