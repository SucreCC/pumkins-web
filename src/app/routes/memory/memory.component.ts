import {Component, ElementRef, Inject, Injector, OnInit} from '@angular/core';
import {_HttpClient, TitleService} from '@delon/theme';
import {NzModalService} from "ng-zorro-antd/modal";
import {ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService, TokenService} from '@delon/auth';
import {HttpContext} from "@angular/common/http";
import {ReuseTabService} from "@delon/abc/reuse-tab";
import {Router} from "@angular/router";
import {ITokenModel} from "@delon/auth/src/token/interface";
import {StartupService} from "../../core";
import {NzMessageService} from 'ng-zorro-antd/message';


@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {

  constructor(
    modalSrv: NzModalService,
    private router: Router,
    public el: ElementRef,
    private http: _HttpClient,
    @Inject(DA_SERVICE_TOKEN)
    private tokenService: ITokenService,
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    private startupSrv: StartupService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
  }
}
