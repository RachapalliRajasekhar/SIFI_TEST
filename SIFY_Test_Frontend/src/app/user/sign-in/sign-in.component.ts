import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  errorMessage: string = '';
  submitted: boolean = false;
  constructor(private router: Router, private userservice: MainService) {}
  public user = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  ngOnInit(): void {
    if (this.userservice.isLogedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['']);
    }
  }
  signUp() {
    this.router.navigate(['/signup']);
  }
  onSubmit() {
    this.submitted = true;
    if (this.user.valid) {
      this.userservice.userSignIn(this.user.value).subscribe(
        (loginResponce: any) => {
          localStorage.setItem('token', loginResponce?.token);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
    }
  }
}
