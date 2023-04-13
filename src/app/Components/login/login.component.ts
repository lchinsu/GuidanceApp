import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/Authentication/auth-service.service';

import { TokenStorageService } from 'src/app/Services/Token/token-storage.service';
import { ErrorHandlerService } from 'src/app/Services/ErroHandler/error-handler.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null,
    grant_type: "password"
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService : AuthServiceService, 
    private router:Router,
    private tokenStorage : TokenStorageService,
    private errorHandler : ErrorHandlerService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password, grant_type } = this.form;

    this.authService.login(username, password,grant_type).subscribe(
      data => {
        console.log("access token - " + data.access_token);
        this.tokenStorage.saveToken(data.access_token);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate([`/PatientList/`]);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
