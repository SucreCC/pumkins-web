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
  getBlogViewUrl: string = "/blog/blog-view"

  constructor(
    public service: ServiceblogService,
    public router: Router,
    public http: _HttpClient
  ) {
    this.service.showEdit = false;
  }

  ngOnInit(): void {
    this.getRecentBlogList();
    this.getUserList();
    this.getCategoryList();
    this.getBlogTagList();


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

  pageIndex: number = 1;
  nzTotalPages: number = 0;
  nzPageSize: number = 10;
  show: boolean = true;

  isNotSelected(value: string): boolean {
    return this.listOfSelectedTags.indexOf(value) === -1;
  }

  // nz-card

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
    // @ts-ignore
    document.getElementById('featured-article').style.visibility='hidden'
    this.searchOptions.startDate = this.rangeDate[0];
    this.searchOptions.endDate = this.rangeDate[1];
    this.searchOptions.skipBlogs = (this.pageIndex - 1) * this.nzPageSize;
    this.searchOptions.pageLimit = this.nzPageSize;

    this.http.post(this.getRecentBlogListUrl, this.searchOptions).subscribe(resp => {
      if (resp.status === 0) {
        this.blogList = resp.data;
        // @ts-ignore
        this.nzTotalPages = this.blogList[0].totalBlogs;

        if(this.blogList.length > 0) {
          // @ts-ignore
          document.getElementById('featured-article').style.visibility='visible'
        }
      }
    })
  }

  addIndex(page: any, step?: any): void {
    if (step === 0) {
      this.pageIndex = page;
    }
    if (this.pageIndex > 1 && this.pageIndex < this.nzTotalPages / this.nzPageSize) {
      this.pageIndex = this.pageIndex + step;
    }
    this.getRecentBlogList();
  }

  showDetail(blog: Blog) {
    localStorage.setItem("articleImgList", blog.images.toString());
    this.router.navigate(['/blog/article-detail'], {queryParams: {id: blog.id, title: blog.title}});
    this.http.get(this.getBlogViewUrl, {id:blog.id}).subscribe(resp=>{
    });
  }
}
