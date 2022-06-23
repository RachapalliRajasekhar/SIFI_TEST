import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, } from 'rxjs';
import { MainService } from '../main.service'
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AouthGuard implements CanActivate {
  constructor(private service: MainService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.service.isLogedIn()) {
      return true;
    }
    else {
      this.router.navigateByUrl('');
      return false;
    }
  }


}
