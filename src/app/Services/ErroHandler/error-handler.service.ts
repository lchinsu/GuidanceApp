import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorMessageService } from 'src/app/Components/error-message/error-message.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private router : Router,
    private errorMessageService : ErrorMessageService
  ) { }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      if(error.status == 401){
        this.router.navigate([`/Login/`]);
      }
      
  
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
  
      // // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.errorMessageService.add(`PatientService: ${message}`);
  }
}
