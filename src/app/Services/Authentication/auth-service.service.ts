import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from '../ErroHandler/error-handler.service';

const AUTHORIZATION_API = environment.GuidanceWebAPIURL + "api/Account/Register";
const AUTHENTICATION_API = environment.GuidanceWebAPIURL + "token";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpTextOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient,
    private errorHandler : ErrorHandlerService
  ) { }

  login(username: string, password: string,grant_type : string): Observable<any> {
    const querystring = "grant_type=password&username="+username+"&password="+password;
    return this.http.post(AUTHENTICATION_API, 
      querystring
    , httpTextOptions).pipe(
      // tap(_ => this.log(`updated Patient id=${Patient.PatientID}`)),
      catchError(this.errorHandler.handleError<any>('Login'))
      // catchError(this.handleError<any>('updatePatient'))
    );;
  }

  register(Email: string, Password: string, ConfirmPassword: string): Observable<any> {
    return this.http.post(AUTHORIZATION_API, {
      Email,
      Password,
      ConfirmPassword
    }, httpOptions).pipe(
      // tap(_ => this.log(`updated Patient id=${Patient.PatientID}`)),
      catchError(this.errorHandler.handleError<any>('Register'))
      // catchError(this.handleError<any>('updatePatient'))
    );;
  }
}
