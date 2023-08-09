import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalVariableService} from "../../../../service/global-variable.service";
import {_HttpClient} from "@delon/theme";


class FeaturedArticle {
  id: number;
  images: any[];
  title: string;
  day: number;
  blogDescription: string;
}

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

  getFeaturedArticleUrl: string = "/blog/featured-article"
  show: boolean = true;
  articleList: any;
  // workOrLife: boolean = true;


  constructor(private router: Router,
              private transferValueService: GlobalVariableService,
              private http: _HttpClient,) {
  }

  ngOnInit() {
    this.setShowToLocalStorage();
    this.getArticle();

  }


  switchShow(show: boolean) {
    this.show = show;
    localStorage.setItem("show", show.toString());
    this.getArticle();
  }

  getArticle() {
    this.http.get(this.getFeaturedArticleUrl, {workOrLife: this.show}).subscribe(resp => {
      if (resp.status === 0) {
        this.articleList = resp.data;
      }
    })
  }


  private setShowToLocalStorage() {
    let show = localStorage.getItem("show");
    if (show === "true".toString()) {
      this.show = true;
    } else {
      this.show = false;
    }
  }


  showDetail(article: FeaturedArticle) {
    localStorage.setItem("articleImgList", article.images.toString());
    this.router.navigate(['/blog/article-detail'], {queryParams: {id: article.id, title: article.title}});
  }
}
