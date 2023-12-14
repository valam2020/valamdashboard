import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer.router.module';
import { HomeComponent } from '../home/home.component';
import { DispatcherComponent } from '../dispatcher/dispatcher.component';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { MaterialModule } from 'src/app/material/material.module';
import { HeroImageComponent } from '../hero-image/hero-image.component';
import { AddDispatcherComponent } from '../add-dispatcher/add-dispatcher.component';
import { RolesComponent } from '../roles/roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { AddRegisterComponent } from '../add-register/add-register.component';
import { RouterModule } from '@angular/router';
import { TimesheetComponent } from '../timesheet/timesheet.component';
import { CustomerCareExecutiveComponent } from '../customer-care-executive/customer-care-executive.component';
import { DispatcherDashboardComponent } from '../dispatcher-dashboard/dispatcher-dashboard.component';
import { DispatcherBehaviourService } from '../customer-service/dispatcher-subject.service';
import { DispatcherDriversComponent } from '../dispatcher-drivers/dispatcher-drivers.component';
import { DispatcherCarsComponent } from '../dispatcher-cars/dispatcher-cars.component';
import { DispatcherSchedulersComponent } from '../dispatcher-schedulers/dispatcher-schedulers.component';
import { DispatcherSearchDriverComponent } from '../dispatcher-search-driver/dispatcher-search-driver.component';
import { DispatcherSearchCarComponent } from '../dispatcher-search-car/dispatcher-search-car.component';



@NgModule({
    declarations: [HomeComponent,DispatcherComponent,HeroImageComponent,AddDispatcherComponent,RolesComponent,RegisterComponent,
    AddRegisterComponent,
    TimesheetComponent,
    CustomerCareExecutiveComponent,
    DispatcherDashboardComponent,
    DispatcherDriversComponent,
    DispatcherCarsComponent,
    DispatcherSchedulersComponent,
    DispatcherSearchDriverComponent,
    DispatcherSearchCarComponent,
    ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,ReactiveFormsModule,FormsModule,
    RouterModule
  ],
  providers:[DispatcherService,DispatcherBehaviourService]
})
export class CustomerModule { }
