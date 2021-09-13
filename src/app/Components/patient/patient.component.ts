import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/Model/Form/Patient';
import { PatientService } from 'src/app/Services/Form/Patient/patient.service';
import { ErrorMessageService } from '../error-message/error-message.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private patientService : PatientService,public router: Router, private errorMessageService : ErrorMessageService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  patients: Patient[] = [];

  getPatients(): void {
    this.patientService.getPatients()
        .subscribe(patients => this.patients = patients);
  }

  
  displayedColumns: string[] = ['PatientName', 'Gender', 'DOB', 'Unit', 'AdmissionDate', 'TreatingDoctor','Delete'];
  dataSource = this.patients;

  routeTo(row : string): void{
    this.router.navigate([`/PatientDetail/` + row]);
  }

  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  // @ViewChild(MatSort) sort: MatSort;

  // ngAfterViewInit() {
  //    this.patients.sort = this.sort;
  // }

  DeletePatient(Id: string):void{
      this,this.patientService.deletePatient(parseInt(Id)).subscribe(
        value => {
          if(value===1){
            this.getPatients();
          }else{
            this.getPatients();
          }
      }
      )
  }

}
