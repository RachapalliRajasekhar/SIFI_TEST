import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private mainservice: MainService) {}
  private data = new BehaviorSubject('default data');
  data$ = this.data.asObservable();

  changeData() {
    this.mainservice.getUserProfile().subscribe(
      (userprofile: any) => {
        if (!userprofile.user) {
          localStorage.clear();
        }
        this.data.next(userprofile?.user);
      },
      (error: any) => {
        if (error.error.message == 'User record not found.') {
          localStorage.clear();
        }
      }
    );
  }
}
