import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-web-information',
  templateUrl: './web-information.component.html',
  styleUrls: ['./web-information.component.less']
})
export class WebInformationComponent implements OnInit{
  public hourDegrees: number = 0;
  public minuteDegrees: number = 0;
  public secondDegrees: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.updateClock();
    setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  updateClock() {
    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();

    this.hourDegrees = (hour + minute / 60) * 360 / 12;
    this.minuteDegrees = (minute + second / 60) * 360 / 60;
    this.secondDegrees = (second * 360 / 60);
  }
}
