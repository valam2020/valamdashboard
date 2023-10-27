import { Component, OnInit, ViewChild } from '@angular/core';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddDispatcherComponent } from '../add-dispatcher/add-dispatcher.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mesages } from 'src/app/Helpers/Constant';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.scss']
})
export class DispatcherComponent implements OnInit{

  displayedColumns = ['firstname', 'lastname','emailid','phonenumber','regid',"pincode",'address',"delete"];
  dataSource!: MatTableDataSource<any>;
  isEdit:boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title:string="Dispatcher";
  selectedDispatcher: any = {
    firstName:"",
    lastName:"",
    id:""
  };
  public addDispatcherForm!: FormGroup;
  dispatcherList: any = [];
  submitted = false;
  constructor(private dispatcherService:DispatcherService,public dialog: MatDialog, private fb:FormBuilder,private router:Router,private activeRoute:ActivatedRoute){
      this.addDispatcherForm = this.fb.group({
        firstName:["",[Validators.required]],
        lastName:["",[Validators.required]],
        email:["",[Validators.required]],
        phNum:["",[Validators.required]],
        pincode:["",[Validators.required]],
        address:["",[Validators.required]],
        disRegId:["",[Validators.required]]
      })
  }

  ngOnInit(): void {
    this.getAllDispatchers();
  }
  get f() { return this.addDispatcherForm.controls; }


  ngAfterViewInit() {
  }

  getAllDispatchers(){
    this.dispatcherService.getDispatcher().subscribe((data:any)=>{
      let dataList = data.filter((s:any)=>{return s.deleted == false});
      this.dispatcherList = dataList;
      this.dataSource =new MatTableDataSource(dataList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }




  openDispatcher(templateRef:any,row:any,isEdit:boolean = false){
    this.clearDispatcher();  
    this.selectedDispatcher={};
    this.isEdit = isEdit;
    if(isEdit){
        this.addDispatcherForm.patchValue({
          firstName:row.firstName,
          lastName:row.lastName,
          email:row.email,
          phNum:row.phNum,
          pincode:row.pincode ?? "",
          address:row.address ?? "",
          disRegId:row.disRegId ?? ""      
        });
       this.selectedDispatcher = this.addDispatcherForm.value;
       this.selectedDispatcher.id = row.id;  
      }     
    
    const dialogRef = this.dialog.open(templateRef,{
      width: '800px',disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isEdit = false;
    });
  }

  openDeleteDailog(templateRef:any,row:any)
  {
    this.selectedDispatcher = row;
    let deleteDialogRef = this.dialog.open(templateRef, {
      width: '600px',
      disableClose: true
    });

    deleteDialogRef.afterClosed().subscribe(result => {
      this.selectedDispatcher={};
    });
  }

  confirmDelete(){

    let dispatcherDto={
      "dispatcherId": this.selectedDispatcher.id,
    }
    this.dispatcherService.deleteDispatcher(dispatcherDto).subscribe((result:any)=>{
      this.selectedDispatcher={};
      this.dialog.closeAll();
      this.getAllDispatchers();
    })
  }

  saveDispatcher(){

    this.submitted = false;
    console.log(this.addDispatcherForm);
    if(this.addDispatcherForm.invalid)
    {
      this.submitted = true;
      return;
    }

    let dispatcherDetails = this.addDispatcherForm.value;
    dispatcherDetails.password = this.addDispatcherForm.value.firstName+ Mesages.password; 
    this.dispatcherService.addDispatcher(dispatcherDetails).subscribe((data:any)=>{
      this.dispatcherList.push(data)
      this.dataSource =new MatTableDataSource(this.dispatcherList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;      
      this.dialog.closeAll()
    })
  }

  updateDispatcher(){
    if(this.addDispatcherForm.invalid)
    {
      return;
    }

    let dispatcherDetails = this.addDispatcherForm.value;
    dispatcherDetails.dispatcherId = this.selectedDispatcher.id;

    this.dispatcherService.updateDispatcher(dispatcherDetails).subscribe((data:any)=>{
      this.dispatcherList.filter((s:any)=>{ if(data.id == s.id){
        s.firstName = data.firstName,
        s.lastName = data.lastName,
        s.email = data.email,
        s.phNum = data.phNum,
        s.pincode = data.pincode ?? "",
        s.address = data.address ?? "",
        s.disRegId = data.disRegId ?? ""      
      }});
      this.dataSource =new MatTableDataSource(this.dispatcherList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;     
       this.dialog.closeAll()
    })
  }

  clearDispatcher(){
    this.addDispatcherForm.patchValue({
      firstName:"",
      lastName:"",
      email:"",
      phNum:"",
      pincode:"",
      address:"",
      disRegId:""      
    });
  }

  dispatcherDashboard(dispatcher:any){
    this.router.navigate(['customer/dashboard/dispatcher-dashboard/'+dispatcher.id])
  }  
  
  

}
