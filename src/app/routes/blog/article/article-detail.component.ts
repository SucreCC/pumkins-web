import {Component, ElementRef, OnInit} from '@angular/core';
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

  commentList: any[] = [
    {name: '', description: '', subComment: ''},
    {name: '', description: '', subComment: ''},
    {name: '', description: '', subComment: ''}];

  comment: string = "This is submit comment"

  constructor(private route: ActivatedRoute, public el: ElementRef,) {
  }

  ngOnInit(): void {
    let articleId = this.route.snapshot.queryParams['id'];
  }

}
