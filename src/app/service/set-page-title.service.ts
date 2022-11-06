import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { map, filter } from "rxjs/operators";
import {TitleService} from "@delon/theme";

@Injectable({
  providedIn: 'root'
})
export class SetPageTitleService {

  constructor(
    private router: Router,
    private titleService: TitleService
  ) {}

  setTitle() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router)
    )
      .subscribe((event) => {
        console.log(this.router.routerState)
        console.log(this.router.routerState.root)

        const titles = this.getTitle(this.router.routerState, this.router.routerState.root);
        const title = titles[titles.length - 1];
        // console.log(title);
        if (title) {
          this.titleService.setTitle(title);
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
}
