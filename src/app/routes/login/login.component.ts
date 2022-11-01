import {Component} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  username: any;
  password: any;
  showLogin: boolean = false;


  constructor(
    private fb: FormBuilder,
    modalSrv: NzModalService,
  ) {
  }

  register() {


  }

  forgetPassword() {

  }
}
