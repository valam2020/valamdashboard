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



@NgModule({
    declarations: [HomeComponent,DispatcherComponent,HeroImageComponent,AddDispatcherComponent,RolesComponent,RegisterComponent,
    AddRegisterComponent
    ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,ReactiveFormsModule,FormsModule,
    RouterModule
  ],
  providers:[DispatcherService]
})
export class CustomerModule { }
