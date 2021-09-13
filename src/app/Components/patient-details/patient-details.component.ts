import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/Model/Form/Patient';
import { Gender } from 'src/app/Model/MasterList/Gender';
import { Ward } from 'src/app/Model/MasterList/Ward';
import { HospitalDeptUnit } from 'src/app/Model/MasterList/HospitalDeptUnit';
import { Doctor } from 'src/app/Model/MasterList/Doctor';
import { MasterListService } from 'src/app/Services/MasterList/master-list.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/Services/Form/Patient/patient.service';


@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  patient : Patient | undefined;

  genderList : Gender[] | undefined;
  wardList : Ward[] | undefined;
  doctorList : Doctor[] | undefined;
  hospitaldeptunitList : HospitalDeptUnit[] | undefined;

  minDate: Date;
  maxDate: Date;

  constructor(
    private route: ActivatedRoute,
    private PatientService: PatientService,
    private location: Location,
    private masterListService : MasterListService,
    private router : Router
  ) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.maxDate = new Date()
  }

  ngOnInit(): void {
    this.getPatient();
    this.getGenderList();
    this.getHospitalDeptUnitList();
    this.getWardList();
    this.getDoctorList();
  }

  getPatient(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!,10);
    if(id === 0){
      this.patient = {} as Patient;
    }else{
      this.PatientService.getPatient(id)
          .subscribe(Patient => this.patient = Patient);
    }
    
  }

  RedirectToPatientList(): void {
    this.router.navigate([`/PatientList/`]);
  }

  save(): void {
    if (this.patient) {
      this.PatientService.updatePatient(this.patient)
        .subscribe(() => this.RedirectToPatientList());
    }
  }

  Delete():void{
    if (this.patient) {
      this.PatientService.deletePatient(this.patient.PatientID)
        .subscribe(() => this.RedirectToPatientList());
    }
  }

  onSubmit():void{
    this.save();
  }

  getGenderList() : void{
    this.masterListService.getList<Gender>("Gender")
        .subscribe(genderlist => this.genderList = genderlist);
  }

  getWardList() : void{
    this.masterListService.getList<Ward>("Ward")
        .subscribe(wardlist => this.wardList = wardlist);
  }

  getDoctorList() : void{
    this.masterListService.getList<Doctor>("Doctor")
        .subscribe(doctorlist => this.doctorList = doctorlist);
  }

  getHospitalDeptUnitList() : void{
    this.masterListService.getList<HospitalDeptUnit>("HospitalDeptUnit")
        .subscribe(hospitaldeptunitlist => this.hospitaldeptunitList = hospitaldeptunitlist);
  }

}
