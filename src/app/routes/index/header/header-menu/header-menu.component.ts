import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  logoutStatus = false;

  constructor(private routerModule: RouterModule) {

  }

  ngOnInit(): void {
  }
}
