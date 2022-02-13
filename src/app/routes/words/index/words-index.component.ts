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

  fileList: NzUploadFile[] = [];
  xlsxFile: any;
  uploading: boolean = false;

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
    this.http.post(URLS.addWords.url, formData).subscribe(res => {
      if (res.status === 0) {
        this.uploading = false;
        this.msg.success("upload success");
      }
    })
  }
}
