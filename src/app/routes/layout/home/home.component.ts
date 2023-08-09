import {Component, OnInit} from '@angular/core';
import {_HttpClient} from "@delon/theme";


class News {
  id: number;
  title: string;
  url: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})


export class HomeComponent implements OnInit {
  getHotTopicUrl: string = "/news/get-hot-topic"

  constructor(private http: _HttpClient,) {
  }

  ngOnInit(): void {
    this.getHotTopic();
  }

  newsList: [];
  newsUrl: string = "";
  newsTitle: string = "";


  private getHotTopic() {
    this.http.get(this.getHotTopicUrl).subscribe(resp => {
      if (resp.status === 0) {
        this.newsList = resp.data;
        this.dynamicNews();
      }
    })
  }


  dynamicNews() {
    let count: number = 0;
    let news: News = this.newsList[count++];
    this.newsUrl = news.url;
    this.newsTitle = news.title;

    setInterval(() => {
      let news: News = this.newsList[count++];
      this.newsUrl = news.url;
      this.newsTitle = news.title;
      if (count === 9) {
        count = 0;
      }
    }, 10000)
  }

  toNewsDetail() {
    window.open(this.newsUrl)
  }
}
