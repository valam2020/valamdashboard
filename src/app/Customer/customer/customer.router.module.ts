import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerComponent} from '../customer/customer-component/customer/customer.component';
import { HomeComponent } from '../home/home.component';
import { DispatcherComponent } from '../dispatcher/dispatcher.component';

const routes: Routes = [
   {
    path:"home",
    component:HomeComponent
   },
   {
    path:"dispatcher",
    component:DispatcherComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
