import {Component, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {

  pictureNumber: number;
  pictureIndex: number = 0;
  elementsByClassName: any;
  prefixPath: string = "/assets/my-assets/images/theme/body/";
  pictureSrc: string ;

  getDynamicPictureUrl: string = "/index/header/dynamic-picture";

  constructor(public http: _HttpClient,) {
  }

  ngOnInit(): void {
    this.dynamicPicture()

    this.test();

  }


  dynamicPicture() {
    let index = 1;
    this.pictureNumber = 4;

    setInterval(() => {
      let picture = "body" + index.toString() + ".jpeg"
      this.pictureSrc = this.prefixPath + picture;
      if (index === this.pictureNumber) {
        index = 0;
      }

      index++;
    }, 2000)
  }


  test() {
    this.http.post(this.getDynamicPictureUrl).subscribe(res => {
      if (res.status === 0) {
      }
    });
  }
}
