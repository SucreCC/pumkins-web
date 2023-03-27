import {Component, OnInit} from '@angular/core';
import {ServiceblogService} from "../data/blog-service.service";
import {Router} from "@angular/router";
// import {HttpClient} from "@angular/common/http";
import {_HttpClient} from "@delon/theme";
import {Blog} from "../../backend/add-blog/add-blog.component";

@Component({
  selector: 'app--blog-recent',
  templateUrl: './blog-recent.component.html',
  styleUrls: ['./blog-recent.component.scss']
})
export class BlogRecentComponent implements OnInit {

  getUserListUrl: string = "/time-line/get-user-list";
  getCategoryListUrl: string = "/blog/get-category";
  getBlogTagListUrl: string = "/recent-blog/get-tag-list";
  getRecentBlogListUrl: string = "/recent-blog/get-recent-blog-list";
  blogsDetail: Blog[] = [];

  constructor(
    public service: ServiceblogService,
    public router: Router,
    public http: _HttpClient
  ) {
    this.service.showEdit = false;
  }

  ngOnInit(): void {
    // this.getRecentBlogList();
    this.getUserList();
    this.getCategoryList();
    this.getBlogTagList()


    if (this.service.Blogs.length === 0) {
      this.service.getBlog().subscribe((d: any) => (this.service.Blogs = d));
    }
    this.setShowToLocalStorage();
  }

  loginClick() {
    this.router.navigate(['/login']);
  }

  newPost() {
    this.router.navigate(['/post']);
  }

  viewDetail(id: number) {
    this.service.detailId = id;

    if (this.service.loginStatusService) this.service.showEdit = true;

    this.router.navigate(['/blogDetail', id]);
  }

//  search
  placeHolder = ["startDate", "endDate"];
  listOfUser: Array<{ username: string; userId: number }> = [];
  listOfCategory: Array<{ categoryName: string; categoryId: number }> = [];
  listOfOption = [];
  listOfSelectedTags: string[] = [];
  rangeDate: Date[] = [];
  blogList: Blog[] = [];
  searchOptions: any = {
    userId: '',
    startDate: '',
    endDate: '',
    tags: [],
    categoryName: '',
    title: '',
    skipBlogs: 0,
    pageLimit: 10,
  };

  isNotSelected(value: string): boolean {
    return this.listOfSelectedTags.indexOf(value) === -1;
  }

  // nz-card
  getTableList() {
    this.searchOptions.startDate = this.rangeDate[0];
    this.searchOptions.endDate = this.rangeDate[1];
    console.log(this.searchOptions);
    // this.http.post(this.searchNodeListListUrl, this.searchOptions).subscribe(resp => {
    //   if (resp.status === 0) {
    //     this.nodeList = resp.data;
    //   }
    // })
  }

  resetTableList() {
    this.searchOptions = {};
    this.rangeDate = [];
  }

  private getUserList() {
    this.http.get(this.getUserListUrl).subscribe(resp => {
      // @ts-ignore
      if (resp.status === 0) {
        // @ts-ignore
        resp.data.forEach(user => this.listOfUser.push({username: user.username, userId: user.userId}))
      }
    })
  }


  workImgList: string[] = ["/assets/my-assets/images/theme/body/body1.jpeg",
    "/assets/my-assets/images/theme/body/body2.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg"
  ];


  lifeImgList: string[] = ["/assets/my-assets/images/theme/body/body2.jpeg",
    "/assets/my-assets/images/theme/body/body2.jpeg",
    "/assets/my-assets/images/theme/body/body2.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg",
    "/assets/my-assets/images/theme/body/body3.jpeg"
  ];

  show: boolean = true;

  switchShow(show: boolean) {
    this.show = show;
    localStorage.setItem("show", show.toString());
  }

  private setShowToLocalStorage() {
    let show = localStorage.getItem("show");
    if (show === "true".toString()) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  showDetail() {

  }

  private getCategoryList() {
    this.http.get(this.getCategoryListUrl).subscribe(resp => {
      if (resp.status === 0) {
        // @ts-ignore
        resp.data.forEach(category => this.listOfCategory.push({categoryName: category.label, categoryId: category.id}))
      }
    })
  }

  private getBlogTagList() {
    this.http.get(this.getBlogTagListUrl).subscribe(resp => {
      if (resp.status === 0) {
        this.listOfOption = resp.data;
      }
    })
  }

  getRecentBlogList() {
    this.searchOptions.startDate = this.rangeDate[0];
    this.searchOptions.endDate = this.rangeDate[1];
    this.searchOptions.skipBlogs = (this.pageIndex - 1) * this.nzPageSize;
    this.searchOptions.pageLimit = this.nzPageSize;

    console.log(this.searchOptions);

    this.http.post(this.getRecentBlogListUrl, this.searchOptions).subscribe(resp => {
      if (resp.status === 0) {
        this.blogList = resp.data;
      }
    })
  }


  pageIndex: number = 1;
  nzTotalPages: number = 200;
  nzPageSize: number = 10;

  addIndex(page: any, step?: any): void {
    if (step === 0) {
      this.pageIndex = page;
    }
    if (this.pageIndex > 1 && this.pageIndex < this.nzTotalPages / this.nzPageSize) {
      this.pageIndex = this.pageIndex + step;

    }
  }
}
