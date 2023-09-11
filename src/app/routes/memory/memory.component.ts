import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from 'ng-zorro-antd/message';
import {Blog} from "../backend/add-blog/add-blog.component";
import {Router} from "@angular/router";

export class TimeNode {
  title: string;
  // @ts-ignore
  createDate = new Date();
  updateDate = new Date();
  timeDescription: string;
  latitude: any = 0;
  longitude: any = 0;
  linkBlog: any;
  tags: [] = [];
  username: string;
  userId: number;
}

export class TimeLineUser {
  username: string;
  userId: number;
}

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {

  getBlogListUrl: string = "/time-line/blog-list";
  saveTimeNodeUrl: string = "/time-line/save-time-node";
  getTimeNodeUrl: string = "/time-line/get-time-node";
  getUserListUrl: string = "/time-line/get-user-list";
  getTagListUrl: string = "/time-line/get-tag-list";
  searchNodeListListUrl: string = "/time-line/search-node-list";
  getBlogViewUrl: string = "/blog/blog-view"


  // search
  listOfUser: Array<{ username: string; userId: number }> = [];
  listOfOption = [];
  listOfSelectedTags: string[] = [];
  rangeDate: Date[] = [];
  searchOptions: any = {
    userId: '',
    startDate: '',
    endDate: '',
    tags: []
  };

  // tags
  tags = [];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;

  // drawer
  nodeList: TimeNode[];
  timeNode: TimeNode = new TimeNode()
  blogTimeLineList: [] = [];
  linkBlog: [] = [];
  location: any;
  isUpdateLocation: boolean = false;
  drawerTitle = "Add Time Node"
  showButton: boolean = true;
  isTransferVisible = false;
  user: any;

  // Link Blog
  visible = false;
  childrenVisible = false;

  placeHolder = ["startDate", "endDate"];

  constructor(
    modalSrv: NzModalService,
    private http: _HttpClient,
    public msg: NzMessageService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(<string>localStorage.getItem('user'));
    navigator.geolocation.getCurrentPosition(this.setPosition);
    this.getTimeNode();
    this.getTimelineBlogList();
    this.showButtonCheck();
    this.getUserList();
    this.getTagList();
  }

  setPosition = (position: any) => {
    this.location = position.coords;
  }


  cancel() {
    this.visible = false;
  }


  // @ts-ignore
  edit(node: any) {
    this.drawerTitle = "Edit Time Node"
    if (this.user.role != "normal") {
      this.visible = true;
    } else {
      this.visible = false;
      return false;
    }
    this.timeNode = node;
    this.tags = node.tags;
  }


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

  // tag end


  // Transfer start
  select(ret: {}): void {
    // console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    // @ts-ignore
    this.timeNode.linkBlog = ret.list;
  }

  getTimelineBlogList() {
    this.http.get(this.getBlogListUrl).subscribe(resp => {
      if (resp.status === 0) {
        this.blogTimeLineList = resp.data;
      }
    })
  }

  // Transfer end


  // Link Blog
  handleOk(): void {
    this.isTransferVisible = false;
  }

  handleCancel(): void {
    this.isTransferVisible = false;
  }

  chooseBlog() {
    this.isTransferVisible = true;
  }

  open(): void {
    this.visible = true;

  }

  close(): void {
    this.visible = false;
    // @ts-ignore
    this.timeNode.tags = this.tags;

    // let user = JSON.parse(<string>localStorage.getItem('user'));
    // @ts-ignore
    this.timeNode.userId = this.user.id;
   // if (location != undefined && this.location.latitude && this.location.longitude) {
   //    this.timeNode.latitude = this.location.latitude;
   //    this.timeNode.longitude = this.location.longitude;
   //  }
    this.http.post(this.saveTimeNodeUrl, this.timeNode).subscribe(resp => {
      if (resp.status === 0) {
        this.blogTimeLineList = resp.data;
      }
    })
    this.timeNode = new TimeNode();
  }

  getTheHighOfScroll(): number {
    return document.documentElement.scrollTop;
  }

  showButtonCheck() {
    setInterval(() => {
      if (this.user.role != 'normal') {
        this.showButton = document.documentElement.scrollTop <= 520;
      }
    }, 1)
  }

  addNode() {
    this.timeNode = new TimeNode();
    this.visible = true;
  }

  getTimeNode() {
    // @ts-ignore
    document.getElementById('cd-timeline').style.visibility = 'hidden'
    this.http.get(this.getTimeNodeUrl).subscribe(resp => {
      this.nodeList = resp.data;
      if (resp.status === 0) {
        if (this.nodeList.length > 0) {
          // @ts-ignore
          document.getElementById('cd-timeline').style.visibility = 'visible'
        } else {
          this.visible = true;
        }
      }
    })
  }

  // nz-card
  getTableList() {
    // @ts-ignore
    document.getElementById('cd-timeline').style.visibility = 'hidden'
    this.searchOptions.startDate = this.rangeDate[0];
    this.searchOptions.endDate = this.rangeDate[1];
    this.http.post(this.searchNodeListListUrl, this.searchOptions).subscribe(resp => {
      this.nodeList = resp.data;
      if (resp.status === 0) {
        if (this.nodeList.length > 0) {
          // @ts-ignore
          document.getElementById('cd-timeline').style.visibility = 'visible'
        }
      }
    })
  }

  resetTableList() {
    this.searchOptions = {};
    this.rangeDate = [];
  }

  private getUserList() {
    this.http.get(this.getUserListUrl).subscribe(resp => {
      if (resp.status === 0) {
        // @ts-ignore
        resp.data.forEach(user => this.listOfUser.push({username: user.username, userId: user.userId}))
      }
    })
  }

  // tags
  isNotSelected(value: string): boolean {
    return this.listOfSelectedTags.indexOf(value) === -1;
  }

  private getTagList() {
    this.http.get(this.getTagListUrl).subscribe(resp => {
      if (resp.status === 0) {
        this.listOfOption = resp.data;
      }
    })
  }


  showDetail(blog: any) {
    // localStorage.setItem("articleImgList", blog.images.toString());
    this.router.navigate(['/blog/article-detail'], {queryParams: {id: blog.blogId, title: blog.title}});
    this.http.get(this.getBlogViewUrl, {id: blog.blogId}).subscribe(resp => {
    });
  }

}
