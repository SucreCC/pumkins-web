import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './app-body.component.html',
  styleUrls: ['./app-body.component.less']
})
export class AppBodyComponent implements OnInit {


  indexPath: string = "/layout";
  currentPath: string="";

  constructor() { }

  ngOnInit(): void {
    this.currentPath=window.location.href.substring(window.location.href.lastIndexOf("/"));

  }

}
