import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerComponent} from '../customer/customer-component/customer/customer.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
   {
    path:"home",
    component:HomeComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
