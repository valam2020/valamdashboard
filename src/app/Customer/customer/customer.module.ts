import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer.router.module';
import { HomeComponent } from '../home/home.component';
import { DispatcherComponent } from '../dispatcher/dispatcher.component';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { MaterialModule } from 'src/app/material/material.module';
import { HeroImageComponent } from '../hero-image/hero-image.component';
import { AddDispatcherComponent } from '../add-dispatcher/add-dispatcher.component';



@NgModule({
    declarations: [HomeComponent,DispatcherComponent,HeroImageComponent,AddDispatcherComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule
  ],
  providers:[DispatcherService]
})
export class CustomerModule { }
