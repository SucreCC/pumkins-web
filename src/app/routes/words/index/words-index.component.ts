import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {NzUploadFile} from "ng-zorro-antd/upload";


@Component({
  selector: 'app-words-index',
  templateUrl: './words-index.component.html',
  styleUrls: ['./words-index.component.less'],
})
export class WordsIndexComponent implements OnInit {

  fileList: NzUploadFile[] = [];

  constructor(
    public router: Router,
    public http: HttpClient,
  ) {}

  ngOnInit(): void {}



}
