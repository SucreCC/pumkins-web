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
    console.log(blog.id)
    // this.article.heading = "this is heading";
    // this.article.id = 2;
    // this.imgList.push("/assets/my-assets/images/home/body5.jpeg")
    // this.imgList.push("/assets/my-assets/images/theme/body/body3.jpeg")
    // this.imgList.push("/assets/my-assets/images/theme/body/body1.jpeg")
    //
    //
    // this.transferValueService.imgList.next(this.imgList);
    // localStorage.setItem("articleImgList", this.imgList.toString())
    // this.router.navigate(['/blog/article-detail'], {queryParams: {id: this.article.id, heading: this.article.heading}})
  }

  ngOnInit(): void {
    this.http.get(this.getArticleBlogUrl).subscribe(resp => {
      if (resp.status === 0) {
        resp.data.forEach((data: Blog) => {
          data.updateDate = data.updateDate.toString().split(" ")[0]
        })
        this.blogList = resp.data;
      }
    })
  }
}

