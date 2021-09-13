import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientComponent } from './Components/patient/patient.component';
import { PatientDetailsComponent } from './Components/patient-details/patient-details.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'PatientList', component: PatientComponent },
  { path: 'PatientDetail/:id', component: PatientDetailsComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },

  { path: '**', redirectTo: '/Login' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
