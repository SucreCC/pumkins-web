import {Component, OnInit, ElementRef} from '@angular/core';
import {_HttpClient} from '@delon/theme';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {

  pictureNumber: number;
  pictureIndex: number = 0;
  elementsByClassName: any;
  showHeader: boolean = false;
  prefixPath: string = "/assets/my-assets/images/theme/body/";
  pictureSrc: string = '';

  getDynamicPictureUrl: string = "/index/header/dynamic-picture";

  constructor(public http: _HttpClient, public el: ElementRef) {
  }

  ngOnInit(): void {
    this.dynamicPicture()


    // this.test();

  }


  dynamicPicture() {
    let index = 1;
    this.pictureNumber = 3;

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
        // this.el.nativeElement.querySelectorAll(".body-img-original")
        // this.el.nativeElement.querySelector('.body-img').style.hide = false;
        this.showHeader = true;
      }
    });
  }

}
