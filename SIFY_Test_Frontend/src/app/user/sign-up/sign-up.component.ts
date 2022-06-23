import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  errorMessage: string = '';
  submitted: boolean = false;
  constructor(private router: Router, private userservice: MainService) {}
  user = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  ngOnInit(): void {}
  signin() {
    this.router.navigate(['/']);
  }
  onSubmit() {
    this.submitted = true;
    if (this.user.valid) {
      this.userservice.userSignUp(this.user.value).subscribe(
        (registeredData) => {
          this.router.navigate(['/']);
        },
        (error: any) => {
          this.errorMessage = error.error;
        }
      );
    }
  }
}
