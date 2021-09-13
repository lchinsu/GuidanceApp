import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../Token/token-storage.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MasterListService {

  constructor(private http: HttpClient, private tokenService : TokenStorageService) { }

  private GenericUrl = environment.GuidanceWebAPIURL + "api/";

  getList<T>(ApiName: string): Observable<T[]> {
    // console.log("token in gender - " + this.tokenService.getToken());
    return this.http.get<T[]>(this.GenericUrl + ApiName);
  }
}
