import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Article} from "../data/blog-type";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.less']
})

export class ArticleDetailComponent implements OnInit {


  article: Article = {
    id: 0,
    image: '',
    heading: '',
    subHeading: '',
    blogDate: '',
    blogDetail: '',
  }

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let articleId = this.route.snapshot.queryParams['id'];


  }
}
