import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUrls } from 'src/app/Helpers/Constant';
import { MatDialog } from '@angular/material/dialog';
import { DispatcherCarsComponent } from '../dispatcher-cars/dispatcher-cars.component';

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
  addCarForm:FormGroup | any;
  submitted: boolean = false;
  @ViewChild("addCarFormDailog",{static:true}) addCarFormDailog:ElementRef | any;
  @ViewChild("deleteCarFormDailog",{static:true}) deleteCarFormDailog:ElementRef | any;
  addEditMode: boolean = false;
  selectedCarForUpdate:any = {};
  @ViewChild(DispatcherCarsComponent) dispatcherCarsComponent!: DispatcherCarsComponent;

  constructor(private dispatcherService:DispatcherService,private fb:FormBuilder,public dialog: MatDialog){
    this.addCarForm = this.fb.group({
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

  get f(){
    return this.addCarForm.controls;
  }

  getAllDispatchers(){
    this.dispatcherService.getDispatcher().subscribe((data:any)=>{
      this.dispatcherList = data.filter((s:any)=>{return s.deleted == false});
    })
  }

  searchCars(){
    this.dispatcherIdForDrivers = this.selectedDispatcher;
    this.selectedDriverDetails = this.dispatcherList.filter((s:any)=>{return s.id == this.selectedDispatcher})[0];
    this.isSelectedDrivers=true;
  }

  clear(){
    this.selectedDispatcher = "";
    this.isSelectedDrivers = false;
    this.selectedDriverDetails={};
    this.submitted = false;
  }

  getCarTypeList(){
    this.dispatcherService.get(ApiUrls.car.carComfortList).subscribe((data:any)=>{
      this.carComfortList = data;
    });
  }

  openaddCarFormDailog(templateRef:any)
  {
    this.submitted = false;
    const dialogRef = this.dialog.open(templateRef,{
      width: '800px',disableClose: true 
    });
  }


  addCarFormUnderDispatcher(){
    this.submitted = false;
    if(this.addCarForm.invalid)
    {
      this.submitted = true;
      return;
    }
    else{
      let comfortLevelDetails= this.carComfortList.filter((s:any)=>{return (s.id==this.addCarForm.value.carType)})[0];
      let carDetails ={
       carModel:this.addCarForm.value.carModel,
       carColor:this.addCarForm.value.carColor,
       carRegisterId:this.addCarForm.value.carRegisterId,
       comfortLevel:comfortLevelDetails.comfortLevel,
       dispatcherId: this.dispatcherIdForDrivers,
       carStatus:"Available",
       _driver_assigned:false,
       stsId:13 ,
       carType: this.addCarForm.value.carType,      
      };
    this.dispatcherService.post(ApiUrls.car.AddCar,carDetails).subscribe((data:any)=>{
      if(data){
        this.isSelectedDrivers=false;
        this.addCarForm.patchValue({
          carModel:"",
          carColor: "",
          carRegisterId:"",
          carType:"",
        });
        this.dispatcherService.openSnackBar("Car Added Successfully!!!");
        this.searchCars();
        this.dispatcherCarsComponent.getAllCarsUnderDispatcher();
        this.dialog.closeAll();
      }
    })

  }
}


updateDriverDetails()
{
  this.submitted = false;
  if(this.addCarForm.invalid)
  {
    this.submitted = true;
    return;
  }
  else{
    let comfortLevelDetails= this.carComfortList.filter((s:any)=>{return (s.id==this.addCarForm.value.carType)})[0];
    let carDetails ={
      carId:this.selectedCarForUpdate.carId,
      carModel:this.addCarForm.value.carModel,
      carColor:this.addCarForm.value.carColor,
      carRegisterId:this.addCarForm.value.carRegisterId,
      comfortLevel:comfortLevelDetails.comfortLevel,
      dispatcherId: this.selectedCarForUpdate.dispatcher.id,
      _driver_assigned:this.selectedCarForUpdate._driver_assigned,
      carType:this.addCarForm.value.carType,
      stsId:this.selectedCarForUpdate.rideStatus.stsId
     };
     this.dispatcherService.PutMethod(ApiUrls.car.UpdateCarDetails,carDetails).subscribe((response:any)=>{
        if(response){
          this.dispatcherService.openSnackBar("Car Updated Successfully!!!");
          this.dispatcherCarsComponent.getAllCarsUnderDispatcher();
          this.closeDailog();

        }
    },(error)=>{
      this.dispatcherService.errorSnackBar("Something went wrong");
    })
  }
}

openCarDailog(row:any){
  this.selectedCarForUpdate = row;
  this.addEditMode = true;
  this.addCarForm.patchValue({
    carModel:row.carModel,
    carColor:row.carColor,
    carRegisterId:row.carRegisterId,
    carType: parseInt(row.carType),   
  });
  this.openaddCarFormDailog(this.addCarFormDailog);
}

openDeleteCarDailog(row:any){
  this.selectedCarForUpdate = row;
  const dialogRef = this.dialog.open(this.deleteCarFormDailog,{
    width: '400px',disableClose: true 
  });
}


closeDailog(){
  this.addEditMode = false;
  this.selectedCarForUpdate = {};
  this.addCarForm.patchValue({
    carModel:"",
    carColor:"",
    carRegisterId:"",
    carType: "",   
  });
  this.dialog.closeAll();
}

deleteCar()
{

  const carInfo ={
    "carId":this.selectedCarForUpdate.carId
  }
  this.dispatcherService.post(ApiUrls.car.DeleteCarData,carInfo).subscribe((response)=>{
    console.log(response);
    this.dispatcherService.openSnackBar("Car Deleted Successfully!!!");
    this.dispatcherCarsComponent.getAllCarsUnderDispatcher();
    this.closeDailog();

 })
}

}
