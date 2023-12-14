import { Component, OnInit } from '@angular/core';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUrls } from 'src/app/Helpers/Constant';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dispatcher-search-car',
  templateUrl: './dispatcher-search-car.component.html',
  styleUrls: ['./dispatcher-search-car.component.scss']
})
export class DispatcherSearchCarComponent implements OnInit{

  title:string = "Cars";
  selectedDispatcher:any;
  isSelectedDrivers: boolean = false;
  dispatcherIdForDrivers:number = 0;
  selectedDriverDetails: any;
  dispatcherList:any=[];
  carComfortList:any=[];
  addCar:FormGroup | any;

  constructor(private dispatcherService:DispatcherService,private fb:FormBuilder,public dialog: MatDialog){
    this.addCar = this.fb.group({
      id:[],
      carModel: ['', Validators.required],
      carColor: ['', Validators.required],
      carRegisterId:['',Validators.required],
      carType:['',Validators.required],
      comfortLevel:[''],
      _driver_assigned:['']
    });
  }

  ngOnInit(): void {
    this.getAllDispatchers();
    this.getCarTypeList();
  }

  getAllDispatchers(){
    this.dispatcherService.getDispatcher().subscribe((data:any)=>{
      this.dispatcherList = data.filter((s:any)=>{return s.deleted == false});
    })
  }

  searchCars(){
    this.dispatcherIdForDrivers = this.selectedDispatcher;
    this.isSelectedDrivers=true;
    this.selectedDriverDetails = this.dispatcherList.filter((s:any)=>{return s.id == this.selectedDispatcher})[0];
  }

  clear(){
    this.selectedDispatcher = "";
    this.isSelectedDrivers = false;
    this.selectedDriverDetails={};
  }

  getCarTypeList(){
    this.dispatcherService.get(ApiUrls.car.carComfortList).subscribe((data:any)=>{
      this.carComfortList = data;
    });
  }

  openAddCarDailog(templateRef:any)
  {
    const dialogRef = this.dialog.open(templateRef,{
      width: '800px',disableClose: true 
    });
  }
}
