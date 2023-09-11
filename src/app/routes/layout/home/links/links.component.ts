import {Component} from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.less']
})
export class LinksComponent {

  linkin: string = "https://www.linkedin.com/in/kai-deng-2b9673234/";
  linkin_cindy: string = "https://www.linkedin.com/in/jiale-xue-67291828b/";
  github: string = "https://github.com/SucreCC?tab=repositories";
  csdn: string = "https://blog.csdn.net/Ssucre?spm=1000.2115.3001.5343";

  constructor() {
  }

  toLink(link: string) {
    // @ts-ignore
    window.open(link)
  }
}
