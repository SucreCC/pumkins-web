import {Component, ElementRef, OnInit} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

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
  error = '';

  form: FormGroup = this.fb.group({
    username: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    password: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.email]],
  });

  ngOnInit() {
  }

  register() {


  }

  forgetPassword() {

  }

  toRegister() {
    console.log(!this.form.invalid)

    this.disabledButtonFor3seconds();
    // this.msg.error("111");
  }


  disabledButtonFor3seconds() {
    this.isDisabledButton = false;
    this.el.nativeElement.querySelector('.login-button').style.backgroundColor = 'grey';

    this.el.nativeElement.querySelector('.login-button').disabled = true;
    setTimeout(() => {
      this.el.nativeElement.querySelector('.login-button').style.backgroundColor = '#ff7300';
      this.el.nativeElement.querySelector('.login-button').disabled = false;
    }, 2000);

  }

}
