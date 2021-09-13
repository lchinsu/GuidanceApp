import { Injectable } from '@angular/core';
import { Patient } from '../../../Model/Form/Patient';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';
import { ErrorMessageService } from 'src/app/Components/error-message/error-message.service';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient,
    private errorMessageService : ErrorMessageService,
    private router : Router
    ) { }

  // private patientUrl = 'https://localhost:44379/api/Patient';

  private patientUrl = environment.GuidanceWebAPIURL + "api/Patient";
  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientUrl).pipe(
      catchError(this.handleError<Patient[]>('getPatients', []))
    );
  }

  getPatient(id: number): Observable<Patient> {
    const url = `${this.patientUrl}/${id}`;
    return this.http.get<Patient>(url);
  }

  addPatient(Patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientUrl, Patient, this.httpOptions).pipe(
      tap((newPatient: Patient) => this.log(`added Patient w/ id=${newPatient.PatientID}`)),
      catchError(this.handleError<Patient>('addPatient'))
    );
  }

  /** DELETE: delete the Patient from the server */
  deletePatient(id: number): Observable<any> {
    const url = `${this.patientUrl}/${id}`;

    return this.http.delete<Patient>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Patient id=${id}`)),
      catchError(this.handleError<Patient>('deletePatient'))
    );
  }

  /** PUT: update the Patient on the server */
  updatePatient(Patient: Patient): Observable<any> {
    return this.http.post<Patient>(this.patientUrl, Patient, this.httpOptions).pipe(
      tap(_ => this.log(`updated Patient id=${Patient.PatientID}`)),
      catchError(this.handleError<any>('updatePatient'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      if(error.status == 401){
        this.router.navigate([`/Login/`]);
      }
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.errorMessageService.add(`PatientService: ${message}`);
  }
}
