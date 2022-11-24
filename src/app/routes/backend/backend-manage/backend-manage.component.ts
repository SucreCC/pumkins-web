import {Component, OnInit} from '@angular/core';
import {SettingsService, User} from "@delon/theme";

@Component({
  selector: 'app-backend-manage',
  templateUrl: './backend-manage.component.html',
  styleUrls: ['./backend-manage.component.less']
})
export class BackendManageComponent implements OnInit {

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
