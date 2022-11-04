import {Component, ElementRef, OnInit} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {UntypedFormBuilder, FormControl, UntypedFormGroup, ValidationErrors, Validators} from '@angular/forms';
import {_HttpClient} from '@delon/theme';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  constructor(
    public el: ElementRef,
    private fb: UntypedFormBuilder,
    public modalSrv: NzModalService,
    private http: _HttpClient,
  ) {
  }

  username: any;
  password: any;
  email: string;
  error: '';

  user = {
    username: null,
    password: null,
    email: null
  }


  registerUrl: string = "/register";

  form: UntypedFormGroup = this.fb.group({
    username: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    password: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.email]],
  });


  ngOnInit() {
  }


  forgetPassword() {

  }

  toRegister() {
    this.disabledButtonFor3seconds();

    this.user.username=this.form.value.username;
    this.user.password=this.form.value.password;
    this.user.email=this.form.value.email;

    this.http.post(this.registerUrl, this.user).subscribe(resp => {
      if (resp.status === 0) {
      }
    })
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
