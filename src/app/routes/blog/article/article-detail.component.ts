import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Article} from "../data/blog-type";
import {GlobalVariableService} from "../../../service/global-variable.service";
import Vditor from "vditor";
import {ModalHelperOptions} from "@delon/theme";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.less']
})

export class ArticleDetailComponent implements OnInit, OnDestroy {
  vditor: Vditor;
  // vditor 初始化时的配置
  option: IOptions = {
    mode: 'sv',
    height: 'auto',
    // width: "100%",
    theme: 'classic',
    toolbarConfig: {
      pin: true,
    },
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

  title: string = '';
  content: any = '';
  options: ModalHelperOptions = {
    /** 大小；例如：lg、600，默认：`lg` */
    // size: 1200
    size: 'lg'
  };


  article: Article = {
    id: 0,
    image: '',
    heading: '',
    subHeading: '',
    blogDate: '',
    blogDetail: '',
  }

  commentList: any[] = [
    {name: '', description: '', subComment: ''},
    {name: '', description: '', subComment: ''},
    {name: '', description: '', subComment: ''}];

  comment: string = "This is submit comment"

  constructor(private route: ActivatedRoute,
              public el: ElementRef,
              private transferValueService: GlobalVariableService,) {
  }


  ngOnInit(): void {
    let stringImgList = localStorage.getItem('articleImgList');
    this.vditor = new Vditor('vditor', this.option);
    if (stringImgList != null) {
      let imgList = stringImgList.split(',');
      this.transferValueService.imgList.next(imgList);
    }

    let articleId = this.route.snapshot.queryParams['id'];

  }


  ngOnDestroy(): void {
    this.transferValueService.imgList.next(this.transferValueService.originalImgList);
  }

}
