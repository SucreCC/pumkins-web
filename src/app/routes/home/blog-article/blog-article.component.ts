import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Article} from "../../blog/data/blog-type";

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.less']
})


export class BlogArticleComponent implements OnInit {

  // articleList: Article[] = ['', '']
  articleList: any = ['', '']

  article: Article = {
    id: 0,
    image: '',
    heading: '',
    subHeading: '',
    blogDate: '',
    blogDetail: '',
  }


  constructor(private router: Router) {
  }


  showDetail(article: Article) {
    this.article.heading = "this is heading";
    this.article.id = 2;
    this.router.navigate(['/blog/article-detail'], {queryParams: {id: this.article.id, heading: this.article.heading}})
  }

  ngOnInit(): void {
  }
}
