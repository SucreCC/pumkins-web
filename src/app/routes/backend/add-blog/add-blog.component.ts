import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Vditor from "vditor";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {_HttpClient, SettingsService} from "@delon/theme";

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export class Blog {
  id: number;
  images: number[] = [];
  title: string = '';
  tags: string[];
  markdown: string;
  category: number;
  description: string = '';
  username: string = '';
  isVisible: boolean;
  workOrLife: boolean = true;
  isDraft: boolean = false;
}

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.less']
})

export class AddBlogComponent implements OnInit {

  constructor(private settingService: SettingsService,
              private http: _HttpClient,) {
  }

  saveBlogUrl: string = "/blog/save-blog"
  saveTagsUrl: string = "/blog/save-tags"
  saveCategoryUrl: string = "/blog/save-category"

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
  blog: Blog = new Blog();
  title: string = '';
  cover: string[] = [];
  radioValue = 'defaultCover';
  fileList: NzUploadFile[] = [];
  description: '';
  addCategory: any;
  category: number;

  previewImage: string | undefined = '';
  previewVisible = false;
  content: any = '';

  listOfGroupOption = [
    {label: 'Jack', value: 0},
    {label: 'Lucy', value: 1},
    {label: 'Tom', value: 2}
  ];

  isVisible: boolean = true;
  workOrLife: boolean = true;
  isDraft: boolean = false;


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
    // this.saveTags();
    this.saveCategory();
    // this.buildBlog();
    // this.saveBlog();
  }

  saveCategory() {
    for (const value of this.listOfGroupOption.values()) {
      if (value.value === this.category) {
        let category = {label: value.label, value: this.category}
        this.http.post(this.saveCategoryUrl, category).subscribe(resp => {
          if (resp.status === 0) {
            console.log(resp.data);
          }
        })
      }
    }
  }

  saveTags() {
    this.http.post(this.saveTagsUrl, this.tags).subscribe(resp => {
      if (resp.status === 0) {
        console.log(resp.data);
      }
    })
  }

  saveBlog() {
    this.http.post(this.saveBlogUrl, this.blog).subscribe(resp => {
      if (resp.status === 0) {
        console.log(resp.data);
      }
    })
  }

  buildBlog() {
    this.blog.title = this.title;
    this.blog.markdown = this.vditor.getValue();

    if (this.radioValue === "addCover") {
      this.fileList.forEach(element => {
        this.blog.images.push(element.response.data)
      })
    }

    this.blog.tags = this.tags;
    this.blog.category = this.category;
    this.blog.description = this.description;
    // @ts-ignore
    this.blog.username = this.settingService.getUser().username;
    this.blog.isVisible = this.isVisible;
    this.blog.workOrLife = this.workOrLife;
    this.blog.isDraft = this.isDraft;
  }


  open() {
    this.visible = true;
  }

  change() {
    console.log(this.radioValue)
  }


  // tags
  tags = [];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;

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
    // @ts-ignore
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      // @ts-ignore
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  addNewCategory(): void {
    let newCategory: any = {label: this.addCategory, value: this.listOfGroupOption.length}
    this.listOfGroupOption = [...this.listOfGroupOption, newCategory]
  }
}


