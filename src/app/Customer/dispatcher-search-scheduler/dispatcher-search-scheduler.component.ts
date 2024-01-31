import { Component, OnInit, ViewChild } from '@angular/core';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { ApiUrls } from 'src/app/Helpers/Constant';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dispatcher-search-scheduler',
  templateUrl: './dispatcher-search-scheduler.component.html',
  styleUrls: ['./dispatcher-search-scheduler.component.scss']
})
export class DispatcherSearchSchedulerComponent implements OnInit{

  dispatcherList:any=[];
  selectedDispatcher:any;
  isSelectedDrivers: boolean = false;
  dispatcherIdForDrivers:number = 0;
  selectedDriverDetails: any;
  title:string = "Dispatcher Scheduler";
  displayedColumns = ['beginTime', 'endTime','driverName','carName','actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dispatcherService: DispatcherService ){

  }

  ngOnInit(): void {
    this.getAllDispatchers();
  }

  getAllDispatchers(){
    this.dispatcherService.getDispatcher().subscribe((data:any)=>{
      this.dispatcherList = data.filter((s:any)=>{return s.deleted == false});
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

  getSchedulerDetails()
  {
    let schedulerDetails={
      beginDate:"2021-01-01",
      driverId:null,
      carId:null,
      dispatcherId:this.selectedDispatcher,
      endDate:null,
    }

    this.dispatcherService.post(ApiUrls.scheduler.dispatcherSchedulerFecth,schedulerDetails).subscribe((data:any)=>{
      if(data)
      {
        this.dataSource =new MatTableDataSource(data);
      }
      else{
        this.dataSource =new MatTableDataSource();
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
