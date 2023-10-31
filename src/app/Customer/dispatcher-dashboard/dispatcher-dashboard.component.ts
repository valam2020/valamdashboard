import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { ApiUrls } from 'src/app/Helpers/Constant';
import { DispatcherBehaviourService } from '../customer-service/dispatcher-subject.service';

@Component({
  selector: 'app-dispatcher-dashboard',
  templateUrl: './dispatcher-dashboard.component.html',
  styleUrls: ['./dispatcher-dashboard.component.scss']
})
export class DispatcherDashboardComponent implements OnInit{

  dispatcherId:number =0;
  drivers: any = [];
  cars: any = [];
  schdulersDetails: any = [];
  dispatcherName: string = "";
  constructor(private activeRoute:ActivatedRoute,private router:Router,private service:DispatcherService,private dispatcherBehaviourService:DispatcherBehaviourService){

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data:any)=>{
        this.dispatcherId = data.id;
        this.dispatcherName =data.name;
    });
    this.getAllDriversUnderDispatcher();
    this.getAllCarsUnderDispatcher();
    this.getAllScheduler();
  }

  getAllDriversUnderDispatcher(){
    this.service.get(ApiUrls.driver.getAll+this.dispatcherId).subscribe((data:any)=>{
      this.drivers = data;
      this.dispatcherBehaviourService.insertDrivers(this.drivers);
    })
  }

  getAllCarsUnderDispatcher(){
    this.service.get(ApiUrls.car.getCarsUnderDispatcher+this.dispatcherId).subscribe((data:any)=>{
      this.cars = data;
      this.dispatcherBehaviourService.insertCars(this.cars);
    })
  }

  getAllScheduler(){
    this.service.get(ApiUrls.ride.dispatcherScheduler+this.dispatcherId).subscribe((data:any)=>{
      console.log(data)
      this.schdulersDetails = data;
      this.dispatcherBehaviourService.insertScheduler(this.schdulersDetails);
    })
  }

  redirectToDriver(){
    this.router.navigate(['customer/dashboard/dispatcher-drivers/'+this.dispatcherId]);
  }

  redirectToCar(){
    this.router.navigate(['customer/dashboard/dispatcher-cars/'+this.dispatcherId]);
  }

  redirectToScheduler(){
    this.router.navigate(['customer/dashboard/dispatcher-scheduler/'+this.dispatcherId+"/"+this.dispatcherName]);
  }
}
