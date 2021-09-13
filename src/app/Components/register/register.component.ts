import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/Authentication/auth-service.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    Email: null,
    Password: null,
    ConfirmedPassword: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  constructor(private authService : AuthServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { Email, Password, ConfirmedPassword } = this.form;

    this.authService.register(Email, Password, ConfirmedPassword).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate([`/Login/`]);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
