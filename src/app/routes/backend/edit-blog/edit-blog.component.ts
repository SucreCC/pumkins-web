import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Vditor from "vditor";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {_HttpClient, SettingsService} from "@delon/theme";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute, Router} from "@angular/router";
import {Blog} from "../add-blog/add-blog.component";

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export class Category {
  id: number;
  label: string;
  value: number;
}

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.less']
})


export class EditBlogComponent implements OnInit {


  saveEditBlogUrl: string = "/blog/save-edit-blog"
  saveTagsUrl: string = "/blog/save-tags"
  saveCategoryUrl: string = "/blog/save-category"
  getCategoryUrl: string = "/blog/get-category"
  getBlogUrl: string = "/blog/get-blog-by-id";

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
      // this.vditor.setValue(this.content);
    },
    input(md) {
      localStorage.setItem("oldMarkdown", md);
    },
  };


  constructor(private settingService: SettingsService,
              private http: _HttpClient,
              private message: NzMessageService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  visible: boolean = false;
  blog: Blog = new Blog();
  radioValue = 'defaultCover';
  fileList: NzUploadFile[] = [];
  addCategory: any;
  categoryValue: any;
  previewImage: string | undefined = '';
  previewVisible = false;
  listOfGroupOption: Category[] = [];

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  ngOnInit(): void {
    this.getBlogByBlogId();
  }

  getBlogByBlogId() {
    let blogId = this.route.snapshot.queryParams['id'];
    this.http.get(this.getBlogUrl, {"blogId": blogId}).subscribe(resp => {
      if (resp.status === 0) {
        this.blog = resp.data;
        this.blog.images = [];
        this.vditor = new Vditor('vditor', this.option);
        this.vditor.setValue(this.blog.markdown);
      }
    })
  }

  cancel() {
    this.visible = false;
  }

  // @ts-ignore
  close() {
    this.buildBlog();

    if (this.blog.title === "") {
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

  buildBlog() {
    this.blog.markdown = this.vditor.getValue();

    if (this.radioValue === "addCover") {
      this.fileList.forEach(element => {
        this.blog.images.push(element.response.data)
      })
    }

    for (const value of this.listOfGroupOption.values()) {
      // @ts-ignore
      if (value.value === this.categoryValue) {
        // @ts-ignore
        this.blog.category = value.label;
      }
    }
  }


  saveBlog() {
    this.http.post(this.saveEditBlogUrl, this.blog).subscribe(resp => {
      if (resp.status === 0) {
        this.blog.id = resp.data;
        this.router.navigate(['/blog/article-detail'], {queryParams: {id: this.blog.id}})
      }
    })
  }

  open() {
    this.getCategoryList();
    this.visible = true;
  }

  getCategoryList() {
    this.http.get(this.getCategoryUrl).subscribe(resp => {
      if (resp.status === 0) {
        this.listOfGroupOption = resp.data;
        this.listOfGroupOption.forEach((category: Category) => {
          if (category.label === this.blog.category) {
            this.categoryValue = category.value;
          }
        })
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


