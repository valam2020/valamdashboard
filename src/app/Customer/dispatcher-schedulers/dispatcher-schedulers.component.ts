import { Component, OnInit,ViewChild } from '@angular/core';
import { DispatcherBehaviourService } from '../customer-service/dispatcher-subject.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { ApiUrls } from 'src/app/Helpers/Constant';

@Component({
  selector: 'app-dispatcher-schedulers',
  templateUrl: './dispatcher-schedulers.component.html',
  styleUrls: ['./dispatcher-schedulers.component.scss']
})
export class DispatcherSchedulersComponent  implements OnInit{

  schedulerList:any = [];
  displayedColumns = ['user_name',
    'user_phnum',
    'email',
    'drop_Date',
    'driver_name',
    'driver_phnum',
    'car_registered_id',
    'fromAddress',
    'toAddress',
    'payment_total',
    'status'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title:string = "";
  dispatcherId:number = 0;
  dispatcherName: any;

  constructor(private dispatcherBehaviourSubject:DispatcherBehaviourService, private activeRoute:ActivatedRoute,
    private service:DispatcherService){
    this.activeRoute.params.subscribe((data:any)=>{
      this.dispatcherId = data.id;
      this.dispatcherName = data.name+"'s Schedulers";
    });
  }
  ngOnInit(): void {
    this.dispatcherBehaviourSubject.schedulerObservable.subscribe((data:any)=>{
      if(data && data.length>0){
        this.filterSchedulerData(data);
      }
      else{
        this.getAllScheduler();
      }
    });
  }

  getAllScheduler(){
    this.service.get(ApiUrls.ride.dispatcherScheduler+this.dispatcherId).subscribe((data:any)=>{
      this.filterSchedulerData(data);
      this.dispatcherBehaviourSubject.insertScheduler(this.schedulerList);
    })
  }

  filterSchedulerData(data:any){
    this.schedulerList = data;
    this.title = this.dispatcherName;
    this.dataSource =new MatTableDataSource(this.schedulerList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
