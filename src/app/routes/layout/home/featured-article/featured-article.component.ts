import {Component} from '@angular/core';

@Component({
  selector: 'app-featured-article',
  templateUrl: './featured-article.component.html',
  styleUrls: ['./featured-article.component.less']
})
export class FeaturedArticleComponent {
  workImgList: string[] = ["/assets/my-assets/images/theme/body/body1.jpeg",
    "/assets/my-assets/images/theme/body/body2.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg"
  ];


  lifeImgList: string[] = ["/assets/my-assets/images/theme/body/body2.jpeg",
    "/assets/my-assets/images/theme/body/body2.jpeg",
    "/assets/my-assets/images/theme/body/body2.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg"
  ];

  show: boolean = true;


  constructor() {
  }

  ngOnInit() {
    this.setShowToLocalStorage();

  }


  switchShow(show: boolean) {
    this.show = show;
    localStorage.setItem("show", show.toString());
  }

  private setShowToLocalStorage() {
    let show = localStorage.getItem("show");
    if (show === "true".toString()) {
      this.show = true;
    } else {
      this.show = false;
    }
  }


}
