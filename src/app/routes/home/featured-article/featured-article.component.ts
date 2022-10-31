import {Component} from '@angular/core';

@Component({
  selector: 'app-featured-article',
  templateUrl: './featured-article.component.html',
  styleUrls: ['./featured-article.component.less']
})
export class FeaturedArticleComponent {
  imgList: string[] = ["/assets/my-assets/images/theme/body/body1.jpeg",
    "/assets/my-assets/images/theme/body/body2.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg"
  ];


  constructor() {
  }
}
