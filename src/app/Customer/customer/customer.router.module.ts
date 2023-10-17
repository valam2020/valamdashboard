import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerComponent} from '../customer/customer-component/customer/customer.component';
import { HomeComponent } from '../home/home.component';
import { DispatcherComponent } from '../dispatcher/dispatcher.component';
import { RolesComponent } from '../roles/roles.component';
import { RegisterComponent } from '../register/register.component';
import { AddRegisterComponent } from '../add-register/add-register.component';
import { TimesheetComponent } from '../timesheet/timesheet.component';
import { CustomerCareExecutiveComponent } from '../customer-care-executive/customer-care-executive.component';

const routes: Routes = [
   {
    path:"home",
    component:HomeComponent
   },
   {
    path:"dispatcher",
    component:DispatcherComponent
   },
   {
    path:"roles",
    component: RolesComponent
   },
   {
    path:"register",
    component:RegisterComponent
   },
   {
    path:"add-register",
    component:AddRegisterComponent
   },
   {
    path:"add-register/:editObject",
    component:AddRegisterComponent
   },
   {
    path:"timesheet",
    component:TimesheetComponent
   },
   {
    path:"decline-rides",
    component:CustomerCareExecutiveComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
