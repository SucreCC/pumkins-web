import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalVariableService {

  constructor() {
  }

  originalImgList: string[] = ["/assets/my-assets/images/theme/body/body1.jpeg",
    "/assets/my-assets/images/theme/body/body2.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg"
  ];

  public imgList = new BehaviorSubject<string[]>(this.originalImgList);

  public nodeList = new BehaviorSubject<any>(this.originalImgList);


}
