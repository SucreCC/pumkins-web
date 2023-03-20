import {Component, ElementRef, Inject, Injector, OnInit, ViewChild} from '@angular/core';
import {_HttpClient, TitleService} from '@delon/theme';
import {NzModalService} from "ng-zorro-antd/modal";
import {ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService, TokenService} from '@delon/auth';
import {ReuseTabService} from "@delon/abc/reuse-tab";
import {Router} from "@angular/router";
import {StartupService} from "../../core";
import {NzMessageService} from 'ng-zorro-antd/message';

export class TimeNode {
  title: string;
  // @ts-ignore
  createDate = new Date;
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



  // search
  listOfUser: Array<{ username: string; userId: number }> = [];
  listOfOption = [];
  listOfSelectedTags: string[] = [];
  selectedUserId: number;
  searchOptions: any = {
    // templateName: '',
    userId: null,
    // startDate: this.rangeDate[0],
    // endDate: this.rangeDate[1],
    // startDate: getDayStartTime(new Date(), 8),
    // endDate: getDayEndTime(new Date(), 1)
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
  rangeDate: Date[] = [];
  showButton: boolean = false;

  // Link Blog
  visible = false;
  childrenVisible = false;

  placeHolder = ["startDate", "endDate"];

  constructor(
    modalSrv: NzModalService,
    private router: Router,
    public el: ElementRef,
    private http: _HttpClient,
    @Inject(DA_SERVICE_TOKEN)
    private tokenService: ITokenService,
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    private startupSrv: StartupService,
    public msg: NzMessageService
  ) {
  }

  ngOnInit(): void {
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


  edit(node: any) {
    this.drawerTitle = "Edit Time Node"
    this.visible = true;
    this.timeNode = node;
    this.tags = node.tags;

    // @ts-ignore
    // node.linksblog.forEach(linkBlog => this.linkBlog.direction = "right")
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

  reload(direction: string): void {
    // this.getData();
    this.msg.success(`your clicked ${direction}!`);
  }

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
  isTransferVisible = false;

  handleOk(): void {
    this.isTransferVisible = false;
  }

  handleCancel(): void {
    this.isTransferVisible = false;
  }

  chooseBlog() {
    this.isTransferVisible = true;
  }



  vegetables = ['asparagus', 'bamboo', 'potato', 'carrot', 'cilantro', 'potato', 'eggplant'];

  open(): void {
    this.visible = true;

  }

  close(): void {
    this.visible = false;
    // @ts-ignore
    this.timeNode.tags = this.tags;

    let user = JSON.parse(<string>localStorage.getItem('user'));
    // @ts-ignore
    this.timeNode.userId = user.id;
    this.timeNode.latitude = this.location.latitude;
    this.timeNode.longitude = this.location.longitude;
    this.http.post(this.saveTimeNodeUrl, this.timeNode).subscribe(resp => {
      if (resp.status === 0) {
        this.blogTimeLineList = resp.data;
      }
    })
    this.timeNode = new TimeNode();
  }

  openChildren(): void {
    this.childrenVisible = true;
  }

  closeChildren(): void {
    this.childrenVisible = false;
  }

  getTheHighOfScroll(): number {
    return document.documentElement.scrollTop;
  }


  showButtonCheck() {
    setInterval(() => {
      this.showButton = document.documentElement.scrollTop <= 300;
    }, 1)
  }


  addNode() {
    this.timeNode = new TimeNode();
    this.visible = true;
  }

  getTimeNode() {
    this.http.get(this.getTimeNodeUrl).subscribe(resp => {
      if (resp.status === 0) {
        this.nodeList = resp.data;
      }
    })
  }


  // nz-card
  getTableList() {
    console.log(this.selectedUserId)
    console.log(this.rangeDate)
    console.log(this.listOfSelectedTags)
  }

  resetTableList() {
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

}
