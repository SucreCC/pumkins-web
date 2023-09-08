import {Component} from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.less']
})
export class LinksComponent {

  linkin: string = "https://www.linkedin.com/in/kai-deng-2b9673234/";

  constructor() {
  }

  toLink(link: string) {
    // @ts-ignore
    window.open(this.linkin)
  }
}
