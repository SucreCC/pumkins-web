import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Article} from "../../blog/data/blog-type";
import {GlobalVariableService} from "../../../service/global-variable.service";

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.less']
})


export class BlogArticleComponent implements OnInit {

  // articleList: Article[] = ['', '']
  articleList: any = ['', ''];

  article: Article = {
    id: 0,
    image: '',
    heading: '',
    subHeading: '',
    blogDate: '',
    blogDetail: '',
  };

  imgList:string[] =[];


  constructor(private router: Router,
              private transferValueService: GlobalVariableService,) {
  }


  showDetail(article: Article) {
    this.article.heading = "this is heading";
    this.article.id = 2;
    this.imgList.push("/assets/my-assets/images/home/body5.jpeg")
    this.imgList.push("/assets/my-assets/images/theme/body/body3.jpeg")
    this.imgList.push("/assets/my-assets/images/theme/body/body1.jpeg")


    this.transferValueService.imgList.next(this.imgList);
    localStorage.setItem("articleImgList", this.imgList.toString())
    this.router.navigate(['/blog/article-detail'], {queryParams: {id: this.article.id, heading: this.article.heading}})
  }

  ngOnInit(): void {
  }
}
