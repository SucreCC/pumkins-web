import {Component, ElementRef, Inject, Injector, OnInit, ViewChild} from '@angular/core';
import {_HttpClient, TitleService} from '@delon/theme';
import {NzModalService} from "ng-zorro-antd/modal";
import {ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService, TokenService} from '@delon/auth';
import {ReuseTabService} from "@delon/abc/reuse-tab";
import {Router} from "@angular/router";
import {StartupService} from "../../core";
import {NzMessageService} from 'ng-zorro-antd/message';
import {format} from "date-fns";


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

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {

  getBlogListUrl: string = "/time-line/blog-list"
  saveTimeNodeUrl: string = "/time-line/save-time-node"
  getTimeNodeUrl: string = "/time-line/get-time-node"

  nodeList: TimeNode[];
  timeNode: TimeNode = new TimeNode()
  blogTimeLineList: [] = [];
  linkBlog: [] = [];
  location: any;
  isUpdateLocation: boolean = false;
  drawerTitle = "Add Time Node"
  rangeDate: Date[] = [];


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

  // Link Blog

  visible = false;
  childrenVisible = false;

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
    this.timeNode.username = user.username;
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

  showButton: boolean = false;

  showButtonCheck() {
    setInterval(() => {
      this.showButton = document.documentElement.scrollTop <= 300;
    }, 1)
  }


  addNode() {
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

  placeHolder = ["startDate", "endDate"];
  // rangePickerSize="";

  searchOptions: any = {
    templateName: '',
    username: '',
    userId: '',
    startDate: this.rangeDate[0],
    endDate: this.rangeDate[1],

    // startDate: getDayStartTime(new Date(), 8),
    // endDate: getDayEndTime(new Date(), 1)
  };

  getTableList() {
    // this.st.reset({
    //   params: {
    //     templateName: this.searchOptions.templateName,
    //     startDate: format(this.searchOptions.startDate, 'YYYY-MM-DD HH:mm:ss'),
    //     endDate: format(this.searchOptions.endDate, 'YYYY-MM-DD HH:mm:ss'),
    //   },
    // });
  }

  resetTableList() {
    // 重置搜索条件
    this.searchOptions.templateName = '';
    // this.searchOptions.startDate = getDayStartTime(new Date(), 8);
    // this.searchOptions.endDate = getDayEndTime(new Date(), 1);
    this.getTableList();
  }

  // tags
  listOfOption = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  listOfUser = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  listOfSelectedValue: string[] = [];

  isNotSelected(value: string): boolean {
    return this.listOfSelectedValue.indexOf(value) === -1;
  }

  tagChange($event: any, listOfSelectedValue: string[]) {
    console.log(event)
    console.log(listOfSelectedValue)
  }
}
