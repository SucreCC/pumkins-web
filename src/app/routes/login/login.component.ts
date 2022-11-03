import {Component, ElementRef} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzModalService} from "ng-zorro-antd/modal";
import {Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  loginUrl: string = "/login"
  username: string;
  password: any;
  isDisabledButton: boolean = false;

  user = {
    username: null,
    password: null,
  }


  constructor(
    modalSrv: NzModalService,
    public el: ElementRef,
    private http: _HttpClient,
  ) {
  }

  forgetPassword() {

  }

  toLogin() {
    this.disabledButtonFor3seconds();

    console.log(this.user);

    this.http.post(this.loginUrl, this.user).subscribe(resp => {
      if (resp.status === 0) {
      }
    })

  }


  disabledButtonFor3seconds() {
    this.isDisabledButton = true;
    this.el.nativeElement.querySelector('.login-button').style.backgroundColor = 'grey';
    setTimeout(() => {
      this.el.nativeElement.querySelector('.login-button').style.backgroundColor = '#ff7300';
      this.isDisabledButton = false;
    }, 2000);
  }
}
