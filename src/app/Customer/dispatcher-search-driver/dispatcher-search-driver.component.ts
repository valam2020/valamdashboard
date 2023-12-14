import { Component, OnInit } from '@angular/core';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUrls } from 'src/app/Helpers/Constant';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dispatcher-search-driver',
  templateUrl: './dispatcher-search-driver.component.html',
  styleUrls: ['./dispatcher-search-driver.component.scss']
})
export class DispatcherSearchDriverComponent implements OnInit{

  dispatcherList:any=[];
  title:string = "Drivers";
  selectedDispatcher:any;
  isSelectedDrivers: boolean = false;
  dispatcherIdForDrivers:number = 0;
  selectedDriverDetails: any;
  mapDriver:FormGroup<any>;
  driverDetailsWithoutDispatcher:any = [];
  constructor(private dispatcherService:DispatcherService,private  fb:FormBuilder,public dialog: MatDialog)
  {
    this.mapDriver = this.fb.group({
      driverId:['',[Validators.required]]
    });
  }

  ngOnInit(){
    this.getAllDispatchers();
    this.getAllDriversUnderDispatcher();
  }

  get f() { return this.mapDriver.controls; }


  
  getAllDispatchers(){
    this.dispatcherService.getDispatcher().subscribe((data:any)=>{
      this.dispatcherList = data.filter((s:any)=>{return s.deleted == false});
    })
  }

  getAllDriversUnderDispatcher(){
    this.dispatcherService.get(ApiUrls.driver.getAll+ApiUrls.defaultDispatcherValue).subscribe((data:any)=>{
      if(data){
        this.driverDetailsWithoutDispatcher = data.filter((res:any)=>{return (res.firstName!=null)});
      }
    })
  }

  searchDrivers(){
    this.dispatcherIdForDrivers = this.selectedDispatcher;
    this.isSelectedDrivers=true;
    this.selectedDriverDetails = this.dispatcherList.filter((s:any)=>{return s.id == this.selectedDispatcher})[0];
    console.log(this.selectedDispatcher)
  }

  clear(){
    this.selectedDispatcher = "";
    this.isSelectedDrivers = false;
    this.selectedDriverDetails={};
  }

  openMapDriver(templateRef:any,dispatcherId:number)
  {
    this.getAllDriversUnderDispatcher();
    const dialogRef = this.dialog.open(templateRef,{
      width: '800px',disableClose: true 
    });
  }

  saveMapDriverToDispatcher(){
    if(this.mapDriver.invalid){
      return;
     }

     let selectedDriver=this.driverDetailsWithoutDispatcher.filter((res:any)=>{return (res.id==this.mapDriver.value.driverId)})[0];

     let driverDetails ={
      driverId:selectedDriver.id,
      dispatcherId: this.selectedDispatcher,
    };
      this.dispatcherService.post(ApiUrls.driver.UpdateDispatcherDriver,driverDetails).subscribe((s:any)=>{
         if(s!=null || s!=undefined)
         {
          this.isSelectedDrivers=false;
           this.mapDriver.reset();
           this.searchDrivers();
           this.dialog.closeAll();
           this.dispatcherService.openSnackBar("Successfully mapped driver to dispatcher!!!");
            // this.messageService.add({severity:'info', summary: 'Driver added with dispatcher is updated successully'});
            // this.getDriverDetailsByDispatcherId();
            // this.getDriverDetailsWitoutDispatcher();
         }
      })
    
  }
}
