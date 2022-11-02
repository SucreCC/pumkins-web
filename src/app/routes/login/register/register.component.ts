import {Component, ElementRef} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
// import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// import { NzFormTooltipIcon } from 'ng-zorro-antd/form';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {

  constructor(
    public el: ElementRef,
    private fb: FormBuilder,
    public modalSrv: NzModalService,
  ) {
  }

  username: any;
  password: any;
  email: string;
  isDisabledButton: boolean = false;
  form: FormGroup;

  // form: FormGroup = this.fb.group({
  //   email: [null, [Validators.required, Validators.email]],
  //   // password: [null, [Validators.required, Validators.minLength(6), UserRegisterComponent.checkPassword.bind(this)]],
  //   // confirm: [null, [Validators.required, Validators.minLength(6), UserRegisterComponent.passwordEquar]],
  //   mobilePrefix: ['+86'],
  //   mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
  //   captcha: [null, [Validators.required]],
  // });



  register() {


  }

  forgetPassword() {

  }

  toRegister() {
    this.disabledButtonFor3seconds();
    // this.msg.error("111");
  }


  disabledButtonFor3seconds() {
    this.isDisabledButton = true;
    this.el.nativeElement.querySelector('.login-button').style.backgroundColor = 'grey';
    setTimeout(() => {
      this.el.nativeElement.querySelector('.login-button').style.backgroundColor = '#ff7300';
      this.isDisabledButton = false;
    }, 2000);
  }


  isDisabledButton2() {

    return this.isDisabledButton;
  }
}
