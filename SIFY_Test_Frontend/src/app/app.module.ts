import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './aouth/TokenInterceptor';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ViewAndEditProfileComponent } from './view-and-edit-profile/view-and-edit-profile.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignUpComponent,
    SignInComponent,
    BookmarksComponent,
    CreateArticleComponent,
    ViewAndEditProfileComponent,
    ImageCropperComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
