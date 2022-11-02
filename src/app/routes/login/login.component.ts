import {Component, ElementRef} from '@angular/core';
// import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {NzModalService} from "ng-zorro-antd/modal";

import {Validators} from '@angular/forms';

// import { NzFormTooltipIcon } from 'ng-zorro-antd/form';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  username: any;
  password: any;
  isDisabledButton: boolean = false;


  constructor(
    modalSrv: NzModalService,
    public el: ElementRef
  ) {
  }

  register() {


  }

  forgetPassword() {

  }

  toLogin() {
    this.disabledButtonFor3seconds();
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
