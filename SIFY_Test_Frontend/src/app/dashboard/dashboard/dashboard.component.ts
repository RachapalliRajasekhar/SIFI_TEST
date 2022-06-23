import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  articles: any;
  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    //Service Method Call for get All Articles
    this.mainService.getAllArticles().subscribe((articles: any) => {
      this.articles = articles.articles;

      this.articles.forEach((element: any) => {
        element.bookmark = 'fa fa-bookmark-o';
      });
    });
  }
  // Adding Bookmark
  addBookMark(data: any, index: any) {
    data.bookmark = 'fa fa-bookmark';
    this.mainService.createBookMark(data).subscribe((bookmark: any) => {});
  }
}
