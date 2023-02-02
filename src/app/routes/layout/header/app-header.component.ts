import {Component, OnInit, ElementRef, Inject} from '@angular/core';
import {_HttpClient, ALAIN_I18N_TOKEN, SettingsService} from '@delon/theme';
import {ACLService} from '@delon/acl';
import {I18NService} from "../../../core";
import {ITokenModel} from "@delon/auth/src/token/interface";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import {GlobalVariableService} from "../../../service/global-variable.service";
import {Router} from "@angular/router";


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
  user = {
    id: -1,
    username: '',
    icon: '',
    email: '',
    role: '',
  }
  showIcon: boolean = false;

  tokenInfo: ITokenModel = {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aW1lU3RhbXAiOjE2Njc3OTYzMzUsImlkIjoxNCwiZXhwIjoxNjY3ODAzNTM1LCJ1c2VybmFtZSI6Imxhb2RvbmdAbGFvZG9uZyJ9.0Hxj5G_G1n9tD4VG86WjPyzicEPE67XXgTI667jULzw',
    expired: 0,
  };

  imgList: string[] = ["/assets/my-assets/images/theme/body/body1.jpeg",
    "/assets/my-assets/images/theme/body/body2.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg"
  ];

  getDynamicPictureUrl: string = "/layout/header/dynamic-picture";

  constructor(public http: _HttpClient,
              public el: ElementRef,
              private aclService: ACLService,
              @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
              private settingService: SettingsService,
              @Inject(DA_SERVICE_TOKEN)
              private tokenService: ITokenService,
              private transferValueService: GlobalVariableService,
  ) {
  }


  ngOnInit(): void {
    this.transferValueService.imgList.subscribe(imgList => {
      this.imgList = this.transferValueService.imgList.getValue();
    })

    this.dynamicPicture();
    this.getPicture();
    this.getUserFromLocalStorage();

  }


  // dynamicPicture() {
  //   let layout = 1;
  //   this.pictureNumber = 3;
  //   setInterval(() => {
  //     let picture = "body" + layout.toString() + ".jpeg"
  //     this.pictureSrc = this.prefixPath + picture;
  //     if (layout === this.pictureNumber) {
  //       layout = 0;
  //     }
  //
  //     layout++;
  //   }, 2000)
  // }

  dynamicPicture() {
    let index = 0;
    // @ts-ignore
    setInterval(() => {
      let elementRefs = this.el.nativeElement.querySelectorAll(".header-img");
      this.pictureNumber = elementRefs.length;
      for (let e of elementRefs) {
        e.style.opacity = 0;
      }

      if (index === this.pictureNumber) {
        index = 0;
      }
      // @ts-ignore
      elementRefs[index].style.opacity = 1;

      index++;
    }, 5000)
  }


  getPicture() {
    this.http.post(this.getDynamicPictureUrl).subscribe(res => {
      if (res.status === 0) {
        // this.el.nativeElement.querySelectorAll(".body-img-original")
        // this.el.nativeElement.querySelector('.body-img').style.hide = false;
        this.showHeader = true;
      }
    });
  }

  private getUserFromLocalStorage() {
    this.user = JSON.parse(<string>localStorage.getItem('user'));
    this.showIcon = this.user.email.length === 0
  }

  logout() {
    let user: any = null;
    this.settingService.setUser(user);
    this.tokenService.set(this.tokenInfo);
    window.location.reload();
  }
}
