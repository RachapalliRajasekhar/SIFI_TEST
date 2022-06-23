import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  articles: any;
  constructor(private mainservice: MainService) {}

  ngOnInit(): void {
    // service method call to get all Bookmarks
    this.mainservice.getBookmarkArticles().subscribe((bookmarks: any) => {
      this.articles = bookmarks;
    });
  }
}
