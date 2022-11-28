import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Vditor from "vditor";
import {NzUploadFile} from "ng-zorro-antd/upload";

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.less']
})

export class AddBlogComponent implements OnInit {

  constructor() {
  }

  vditor: Vditor;
  // vditor 初始化时的配置
  option: IOptions = {
    mode: 'sv',
    height: '900px',
    theme: 'classic',
    toolbarConfig: {
      pin: true,
    },
    lang: 'en_US',

    preview: {
      markdown: {
        autoSpace: true,
        toc: true,
        mark: true,
      }
    },

    after: () => {
      this.vditor.setValue(this.content);
    },
    input(md) {
      localStorage.setItem("oldMarkdown", md);
    },
  };

  visible: boolean = false;

  blog: {
    name: ''
  }

  title: string = '';
  cover: string[] = [];
  radioValue = 'defaultCover';
  fileList: NzUploadFile[] = [];
  description:'';
  addCategory: any;
  category: any;



  previewImage: string | undefined = '';
  previewVisible = false;
  content: any = '';

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  ngOnInit(): void {
    this.vditor = new Vditor('vditor', this.option);
  }


  close() {
    this.visible = false;
  }

  open() {
    this.visible = true;
  }

  change() {
    console.log(this.radioValue)
  }


  // tags
  tags = ['Unremovable', 'Tag 2', 'Tag 3'];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;
  isVisitable: boolean = false;

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    console.log(this.inputValue)
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

//  Category
  listOfGroupOption = [
    { label: 'Jack', value: 'jack', groupLabel: 'Manager' },
    { label: 'Lucy', value: 'lucy', groupLabel: 'Manager' },
    { label: 'Tom', value: 'tom', groupLabel: 'Engineer' }
  ];

}


