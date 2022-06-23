import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  noAuthHeader = {
    headers: new HttpHeaders({
      Noauth: 'True',
    }),
  };

  url: any = 'http://localhost:7000';
  constructor(private http: HttpClient) {}
  userSignUp(data: any) {
    return this.http.post(`${this.url}/signup`, data, this.noAuthHeader);
  }
  userSignIn(data: any) {
    return this.http.post(`${this.url}/signin`, data, this.noAuthHeader);
  }
  getAllArticles() {
    return this.http.get(`${this.url}/getArticles`);
  }
  getBookmarkArticles() {
    return this.http.get(`${this.url}/getBookMarks`);
  }

  isLogedIn() {
    let val = false;
    if (localStorage.getItem('token') !== null) {
      val = true;
    }
    return val;
  }
  getUserProfile() {
    return this.http.get(`${this.url}/userProfile`);
  }
  createBookMark(data: any) {
    return this.http.post(`${this.url}/bookmarks`, data);
  }
  createArticle(data: any) {
    return this.http.post(`${this.url}/customArticle`, data);
  }
  updateUserProfile(formdata: any) {
    return this.http.put(`${this.url}/updateprofile`, formdata);
  }

  profilepicDelete(userdata: any) {
    return this.http.post(`${this.url}/deleteProfilePic`, userdata);
  }
}
