import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) { }

  login(username: string, password: string,grant_type : string): Observable<any> {
    const querystring = "grant_type=password&username="+username+"&password="+password;
    return this.http.post(AUTHENTICATION_API, 
      querystring
    , httpTextOptions);
  }

  register(Email: string, Password: string, ConfirmPassword: string): Observable<any> {
    return this.http.post(AUTHORIZATION_API, {
      Email,
      Password,
      ConfirmPassword
    }, httpOptions);
  }
}
