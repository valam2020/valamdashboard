import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DispatcherBehaviourService } from '../customer-service/dispatcher-subject.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { ApiUrls } from 'src/app/Helpers/Constant';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dispatcher-drivers',
  templateUrl: './dispatcher-drivers.component.html',
  styleUrls: ['./dispatcher-drivers.component.scss']
})
export class DispatcherDriversComponent implements OnInit{

  driversList:any = [];
  displayedColumns = ['driverName', 'dateOfBirth','emailid','phNum','address','actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title:string = "";
  @Input() dispatcherId:number = 0;
  @Input() openDriverCars:boolean = false;
  @Input() selectedDriverDetails:any;
  selectDriver:any = {};
  constructor(private dispatcherBehaviourSubject:DispatcherBehaviourService, private activeRoute:ActivatedRoute,
    private service:DispatcherService,public dialog: MatDialog){
    this.activeRoute.params.subscribe((data:any)=>{
      this.dispatcherId = data.id;
    });
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(){
    if(!this.openDriverCars){
        this.dispatcherBehaviourSubject.driverObservable.subscribe((data:any)=>{
          if(data && data.length>0){
            this.filterDriverData(data);
          }
          else{
            this.getAllDriversUnderDispatcher();
          }
        });
    }
    else{
      this.getAllDriversUnderDispatcher();
    }
  }

  getAllDriversUnderDispatcher(){
    this.service.get(ApiUrls.driver.getAll+this.dispatcherId).subscribe((data:any)=>{
      this.filterDriverData(data);
      this.dispatcherBehaviourSubject.insertDrivers(data);
    })
  }

  filterDriverData(data:any){
    this.driversList = data;
    if(!this.openDriverCars)
    {
      this.title = (data.length>0)?data[0].dispatcher.firstName+ " " +data[0].dispatcher.lastName+"'s Drivers":"";
    }
    else{
      this.title = this.selectedDriverDetails.firstName+ " "+this.selectedDriverDetails.lastName+"'s Drivers";
    }
    this.dataSource =new MatTableDataSource(this.driversList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dispatcherBehaviourSubject.insertDrivers(data);
  }

  openDeleteDailog(templateRef:any,row:any){
    this.selectDriver = row;
    const dialogRef = this.dialog.open(templateRef,{
      width: '800px',disableClose: true 
    });
  }

  cancelDailog(){
    this.selectDriver = {};
    this.dialog.closeAll();
  }

  
  deleteDriverDetails()
  {
    var deleteDetails={
      "id": this.selectDriver.id
    }
    this.service.post(ApiUrls.driver.deleteDriver,deleteDetails).subscribe((s)=>{
      if(s.httpStatus==400){
        this.service.errorSnackBar(s.message);
        this.cancelDailog();
      }
      else{
        this.service.errorSnackBar('Record is deleted successully');
        this.getAllDriversUnderDispatcher();
      }
    },(error:any)=>{
      console.log(error);
    }) 
   }
}
