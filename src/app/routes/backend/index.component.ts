import {Component, OnInit} from '@angular/core';
import {SettingsService, User} from "@delon/theme";

@Component({
  selector: 'app-backend-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  constructor(private settingService: SettingsService,) {
  }

  user = {
    id: -1,
    username: '',
    icon: '',
    email: '',
    role: '',
  }

  ngOnInit(): void {

    this.user = this.settingService.getUser();



  }
}
