import {Injectable} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {map, filter} from "rxjs/operators";
import {BehaviorSubject, Observer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChangeHeaderImgService {

  constructor(
    private router: Router,
  ) {
  }

  needChangeTitleList: string[] = ['ArticleDetail'];

  imgList: string[] = ["/assets/my-assets/images/theme/body/body1.jpeg",
    "/assets/my-assets/images/theme/body/body2.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg"
  ];


  // public messageSource = new BehaviorSubject<string>('Start');

  // changemessage(message: string): void {
  //   this.messageSource.next(message);
  // }

  getHeaderImg() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router)
    )
      .subscribe((event) => {
        const titles = this.getTitle(this.router.routerState, this.router.routerState.root);
        const title = titles[titles.length - 1];

        // some page like ArticleDetail need change header img
        if (this.isNeedChangeImg(title)) {
          this.changeHeaderImg();
        }
      });
  }

  // @ts-ignore
  private getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }
    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }


  private changeHeaderImg() {
  }


  private isNeedChangeImg(title: string) {
    return this.needChangeTitleList.includes(title);
  }
}
