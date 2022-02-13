import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-words-add',
  templateUrl: './words-add.component.html',
  styleUrls: ['./words-add.component.less'],
})
export class WordsAddComponent implements OnInit {


  constructor(
    public router: Router,
    public http: HttpClient
  ) {}

  ngOnInit(): void {}

}
