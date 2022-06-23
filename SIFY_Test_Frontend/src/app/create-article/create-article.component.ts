import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit {
  article = new FormGroup({
    author: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    ImageUrl: new FormControl('', Validators.required),
    publishedDate: new FormControl(''),
    sourceid: new FormControl(''),
    sourcename: new FormControl(''),
    dec: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });
  submitted: boolean = false;
  constructor(private mainservice: MainService, private router: Router) {}

  ngOnInit(): void {}

  // Create Article
  onSubmit() {
    this.submitted = true;
    if (this.article.valid) {
      let data = {
        source: {
          id: this.article.value.sourceid,
          name: this.article.value.sourcename,
        },
        author: this.article.value.author,
        title: this.article.value.title,
        description: this.article.value.dec,
        url: this.article.value.url,
        urlToImage: this.article.value.ImageUrl,
        publishedAt: this.article.value.publishedDate,
        content: this.article.value.content,
      };
      this.mainservice.createArticle(data).subscribe((article: any) => {
        this.router.navigate(['/']);
      });
    }
  }
}
