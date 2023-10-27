import { Component, OnInit, ViewChild } from '@angular/core';
import { DispatcherBehaviourService } from '../customer-service/dispatcher-subject.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { ApiUrls } from 'src/app/Helpers/Constant';

@Component({
  selector: 'app-dispatcher-drivers',
  templateUrl: './dispatcher-drivers.component.html',
  styleUrls: ['./dispatcher-drivers.component.scss']
})
export class DispatcherDriversComponent implements OnInit{

  driversList:any = [];
  displayedColumns = ['driverName', 'dateOfBirth','emailid','phNum','address'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title:string = "";
  dispatcherId:number = 0;

  constructor(private dispatcherBehaviourSubject:DispatcherBehaviourService, private activeRoute:ActivatedRoute,private service:DispatcherService){
    this.activeRoute.params.subscribe((data:any)=>{
      this.dispatcherId = data.id;
    });
  }

  ngOnInit(): void {
    this.dispatcherBehaviourSubject.driverObservable.subscribe((data:any)=>{
      if(data && data.length>0){
        this.filterDriverData(data);
      }
      else{
        this.getAllDriversUnderDispatcher();
      }
    });
  }

  getAllDriversUnderDispatcher(){
    this.service.get(ApiUrls.driver.getAll+this.dispatcherId).subscribe((data:any)=>{
      this.filterDriverData(data);
      this.dispatcherBehaviourSubject.insertDrivers(data);
    })
  }

  filterDriverData(data:any){
    this.driversList = data;
    this.title = (data.length>0)?data[0].dispatcher.firstName+ " " +data[0].dispatcher.lastName:"";
    this.dataSource =new MatTableDataSource(this.driversList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dispatcherBehaviourSubject.insertDrivers(data);
  }

}
