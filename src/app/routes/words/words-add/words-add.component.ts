import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {URLS} from "../../../share";
import {_HttpClient} from "@delon/theme";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-words-add',
  templateUrl: './words-add.component.html',
  styleUrls: ['./words-add.component.less'],
})
export class WordsAddComponent implements OnInit {


  fileList: NzUploadFile[] = [];
  xlsxFile: any;
  uploading: boolean = false;
  theDay: any;

  constructor(
    public router: Router,
    public http: _HttpClient,
    private msg: NzMessageService
  ) {
  }

  ngOnInit(): void {
  }


  beforeUpload = (file: NzUploadFile): boolean => {
    let fileName = file.name;
    let fileType = fileName.substring(fileName.lastIndexOf('.') + 1);

    if (fileType != 'xlsx') {
      this.fileList.pop();
      this.msg.error("type must be xlsx");
      return false;
    }

    this.fileList = this.fileList.concat(file);

    let fileListLength = this.fileList.length
    if (fileListLength != 1) {
      this.fileList.pop();
      this.msg.error("length must be 1");
      return false;
    }
    this.xlsxFile = this.fileList[0]
    return false;
  };

  handleUpload(): void {
    this.uploading = true;
    const formData = new FormData();
    formData.append("xlsxFile", this.xlsxFile);
    formData.append("theDay",this.theDay),

    this.http.post(URLS.addWords.url, formData).subscribe(res => {
      if (res.status === 0) {
        this.uploading = false;
        this.msg.success("upload success");
      }
    })
  }

}
