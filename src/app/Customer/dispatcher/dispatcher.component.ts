import { Component, OnInit, ViewChild } from '@angular/core';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.scss']
})
export class DispatcherComponent implements OnInit{

  displayedColumns = ['firstname', 'lastname','emailid','phonenumber','regid',"pincode",'address'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title:string="Dispatcher";
  constructor(private dispatcherService:DispatcherService){

  }

  ngOnInit(): void {
    this.getAllDispatchers();
  }

  ngAfterViewInit() {
  }

  getAllDispatchers(){
    this.dispatcherService.getDispatcher().subscribe((data:any)=>{
      console.log(data);
      this.dataSource =new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
