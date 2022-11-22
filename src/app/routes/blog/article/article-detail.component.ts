import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Article} from "../data/blog-type";
import {GlobalVariableService} from "../../../service/global-variable.service";
import Vditor from "vditor";

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
      this.innerHTML = this.vditor.getHTML();
    },
    input(md) {
      localStorage.setItem("oldMarkdown", md);
    },
  };

  title: string = '';
  content: any = '# 听力\n' +
    '\n' +
    '\n' +
    '\n' +
    '提升自己的水平是核心，一味的重复做题是没有意义的。\n' +
    '\n' +
    '\n' +
    '\n' +
    '## 听力目标\n' +
    '\n' +
    '\n' +
    '\n' +
    '#### 七坑表\n' +
    '\n' +
    '七坑表问题整理完后录音完整听三遍\n' +
    '\n' +
    '\n' +
    '\n' +
    '| 错题题号 | 考点           | 具体总结 | 惩罚和遍数 |      |      |\n' +
    '| -------- | -------------- | -------- | ---------- | ---- | ---- |\n' +
    '|          | 单词会读会写   |          |            |      |      |\n' +
    '|          | 理解逻辑关系   |          |            |      |      |\n' +
    '|          | 单词能辨音辨意 |          |            |      |      |\n' +
    '|          | 替换和改写     |          |            |      |      |\n' +
    '|          |                |          |            |      |      |\n' +
    '\n' +
    '#### 七坑表考点\n' +
    '\n' +
    '单词会读会写\n' +
    '\n' +
    '单词能辨音辨意\n' +
    '\n' +
    '句子会读并翻译理解\n' +
    '\n' +
    '理解逻辑关系\n' +
    '\n' +
    '熟悉替换和改写\n' +
    '\n' +
    '明确考试格式要求\n' +
    '\n' +
    '审题认真能进行预判\n' +
    '\n' +
    '## 如何达到听力目标\n' +
    '\n' +
    '\n' +
    '\n' +
    '1. 上完何琼网课\n' +
    '\n' +
    '2. 雅思王语料库第三章，每天半个小时到一个小时听写，半个小时到一个小时改错。雅思王听力179和第三章语料库循环练直到考试。\n' +
    '\n' +
    '3. 跟随b站视频练习数字听写，且多读可以练习读手机里的手机号，各种支付软件的订单号。\n' +
    '\n' +
    '4. 听力真题，然后找到错题的答案句，用羊驼雅思收藏起来，先弄明白意思，弄清发音，看原文读到流畅为止，再用网易有道词典的对话翻译功能，看看应用能不能识别你说的话，没问题后后再用羊驼雅思进行模仿跟读，此时要注意连读，略读，吞音的问题。关注听力中的同意替换，并且记录下来，然后每天复习。\n' +
    '\n' +
    '   读够了后，能够跟上别人说话的进度。\n' +
    '\n' +
    '5. 800句绕口令，有时间拿出来练习舌头。\n' +
    '\n';

  innerHTML: string = '';

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

    if (stringImgList != null) {
      let imgList = stringImgList.split(',');
      this.transferValueService.imgList.next(imgList);
    }

    this.vditor = new Vditor('vditor', this.option);
    let articleId = this.route.snapshot.queryParams['id'];
  }


  ngOnDestroy(): void {
    this.transferValueService.imgList.next(this.transferValueService.originalImgList);
  }

}
