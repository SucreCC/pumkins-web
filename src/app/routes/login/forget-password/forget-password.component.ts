import {Component, ElementRef, OnInit} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {UntypedFormBuilder, FormControl, UntypedFormGroup, ValidationErrors, Validators} from '@angular/forms';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.less']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    public el: ElementRef,
    private fb: UntypedFormBuilder,
    public modalSrv: NzModalService,
  ) {
  }

  verificationCode: any;
  password: any;
  email: string;
  error: '';

  form: UntypedFormGroup = this.fb.group({
    verificationCode: [null, [Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
    password: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.email]],
  });


  ngOnInit() {
  }


  changePassword() {
    this.disabledButtonFor3seconds();
  }


  disabledButtonFor3seconds() {
    this.el.nativeElement.querySelector('.login-button').style.backgroundColor = 'grey';
    this.el.nativeElement.querySelector('.login-button').disabled = true;
    setTimeout(() => {
      this.el.nativeElement.querySelector('.login-button').style.backgroundColor = '#ff7300';
      this.el.nativeElement.querySelector('.login-button').disabled = false;
    }, 2000);

  }
}
