import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {_HttpClient, ModalHelperOptions} from '@delon/theme';
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {URLS} from "../../../share";


@Component({
  selector: 'app-words-index',
  templateUrl: './words-index.component.html',
  styleUrls: ['./words-index.component.less'],
})
export class WordsIndexComponent implements OnInit {


  constructor(
    public router: Router,
    public http: _HttpClient,
    private msg: NzMessageService
  ) {
  }

  ngOnInit(): void {
  }


}
