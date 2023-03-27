import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Vditor from "vditor";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {_HttpClient, SettingsService} from "@delon/theme";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export class Blog {
  id: number;
  images: any[] = [];
  title: string = '';
  tags: string[] = [];
  markdown: string;
  category: string;
  categoryValue: number;
  blogDescription: string = '';
  userId: number ;
  username?: string = '';
  isVisible: boolean;
  workOrLife: boolean = true;
  isDraft: boolean = false;
  createDate: any;
  updateDate: any;
  numberOfThumbUp: number;
  numberOfView: number;
  numberOfComment: number;
  numberOfFavorite: number;
}

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.less']
})

export class AddBlogComponent implements OnInit {

  constructor(private settingService: SettingsService,
              private http: _HttpClient,
              private message: NzMessageService,
              private router: Router,) {
  }

  saveBlogUrl: string = "/blog/save-blog"
  saveTagsUrl: string = "/blog/save-tags"
  saveCategoryUrl: string = "/blog/save-category"
  getCategoryUrl: string = "/blog/get-category"

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
  blogDescription: '';
  addCategory: any;
  categoryValue: number;
  // categoryId: number;
  previewImage: string | undefined = '';
  previewVisible = false;
  content: any = '';
  listOfGroupOption = [];
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

  cancel() {
    this.visible = false;
  }

  // @ts-ignore
  close() {
    this.buildBlog();

    if (this.title === "") {
      this.message.warning("please input the title");
      return false;
    }

    if (!this.blog.category) {
      this.message.warning("please choose the category");
      return false;
    }

    this.visible = false;
    this.saveBlog();
  }

  saveBlog() {
    this.http.post(this.saveBlogUrl, this.blog).subscribe(resp => {
      if (resp.status === 0) {
        this.blog.id = resp.data;
        this.router.navigate(['/blog/article-detail'], {queryParams: {id: this.blog.id}})
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
    for (const value of this.listOfGroupOption.values()) {
      // @ts-ignore
      if (value.value === this.categoryValue) {
        // @ts-ignore
        this.blog.category = value.label;
        // @ts-ignore
        this.blog.categoryValue = value.value;
      }
    }

    this.blog.blogDescription = this.blogDescription;
    // @ts-ignore
    // this.blog.username = this.settingService.getUser().username;
    this.blog.userId= this.settingService.getUser().id;
    this.blog.isVisible = this.isVisible;
    this.blog.workOrLife = this.workOrLife;
    this.blog.isDraft = this.isDraft;
  }


  open() {
    this.getCategoryList();
    this.visible = true;
  }

  getCategoryList() {
    this.http.get(this.getCategoryUrl).subscribe(resp => {
      if (resp.status === 0) {
        this.listOfGroupOption = resp.data;
      }
    })
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
    if (this.listOfGroupOption != null) {
      let newCategory: any = {label: this.addCategory, value: this.listOfGroupOption.length}
      // @ts-ignore
      this.listOfGroupOption = [...this.listOfGroupOption, newCategory]
    }
  }
}


