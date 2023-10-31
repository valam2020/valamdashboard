import { Component, OnInit, ViewChild } from '@angular/core';
import { DispatcherBehaviourService } from '../customer-service/dispatcher-subject.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { ApiUrls } from 'src/app/Helpers/Constant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dispatcher-cars',
  templateUrl: './dispatcher-cars.component.html',
  styleUrls: ['./dispatcher-cars.component.scss']
})
export class DispatcherCarsComponent implements OnInit{

  carsList:any = [];
  displayedColumns = ['carRegisterId','comfortLevel','carColor','carModel','createdDate'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title:string = "";
  dispatcherId:number = 0;

  constructor(private dispatcherBehaviourSubject:DispatcherBehaviourService,private service:DispatcherService,private activeRoute:ActivatedRoute){
    this.activeRoute.params.subscribe((data:any)=>{
      this.dispatcherId = data.id;
    });
  }

  ngOnInit(): void {
    this.dispatcherBehaviourSubject.carsObservable.subscribe((data:any)=>{
      if(data && data.length>0){
        this.filterDriverData(data);
      }
      else{
        this.getAllCarsUnderDispatcher();
      }
    });
  }

  getAllCarsUnderDispatcher(){
    this.service.get(ApiUrls.car.getCarsUnderDispatcher+this.dispatcherId).subscribe((data:any)=>{
      this.filterDriverData(data);
      this.dispatcherBehaviourSubject.insertCars(data );
    })
  }


  filterDriverData(data:any){
    this.carsList = data;
    this.title = (data.length>0)?data[0].dispatcher.firstName+ " " +data[0].dispatcher.lastName+"'s Cars":"";
    this.dataSource =new MatTableDataSource(this.carsList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
