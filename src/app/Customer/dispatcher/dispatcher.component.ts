import { Component, OnInit, ViewChild } from '@angular/core';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddDispatcherComponent } from '../add-dispatcher/add-dispatcher.component';


@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.scss']
})
export class DispatcherComponent implements OnInit{

  displayedColumns = ['firstname', 'lastname','emailid','phonenumber','regid',"pincode",'address',"delete"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title:string="Dispatcher";
  selectedDispatcher: any = {
    firstName:"",
    lastName:"",
    id:""
  };
  constructor(private dispatcherService:DispatcherService,public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.getAllDispatchers();
  }

  ngAfterViewInit() {
  }

  getAllDispatchers(){
    this.dispatcherService.getDispatcher().subscribe((data:any)=>{
      this.dataSource =new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openDispatcher(){
    const dialogRef = this.dialog.open(AddDispatcherComponent,{
      width: '640px',disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDeleteDailog(templateRef:any,row:any)
  {
    this.selectedDispatcher=row;
    let deleteDialogRef = this.dialog.open(templateRef, {
      width: '600px',
      disableClose: true
    });

    deleteDialogRef.afterClosed().subscribe(result => {
      console.log('The delete dialog was closed');
      this.selectedDispatcher={};
    });
  }

  confirmDelete(){

    let dispatcherDto={
      "dispatcherId": this.selectedDispatcher.id,
    }
    this.dispatcherService.deleteDispatcher(dispatcherDto).subscribe((result:any)=>{
      console.log(result);
    })
  }
}
