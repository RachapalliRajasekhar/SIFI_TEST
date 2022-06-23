import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './main.service';
import { SharedService } from './Shared/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userProfile: any;
  constructor(
    private router: Router,
    public userservice: MainService,
    private sharedservice: SharedService
  ) {}

  ngOnInit() {
    this.sharedservice.changeData();
    this.sharedservice.data$.subscribe((user: any) => {
      this.userProfile = user;
    });
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
