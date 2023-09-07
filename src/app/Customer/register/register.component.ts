import { Component, OnInit, ViewChild } from '@angular/core';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  register!:FormGroup;
  rolesData: any = [];
  title:string = "Register";
  allRegisterList: any = [];
  addRegisterLink:string = "/customer/dashboard/add-register";
  displayedColumns = ["empId",'firstName', 'lastName',"emailid","phoneNumber","delete"];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedDeleteInfo: any = {};

  constructor(private service:DispatcherService,private fb:FormBuilder,private router: Router, private route: ActivatedRoute,private dialog :MatDialog){
    this.register = this.fb.group({
      firstName:["",[Validators.required]],
      lastName:["",[Validators.required]],
      email:["",[Validators.required]],
      phoneNumber:["",[Validators.required]],
      role_id:["",[Validators.required]],
      reason:["",[Validators.required]],
      address:["",[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getAllRoles();
    this.getAllRegister();
  }

  get f(){
    return this.register.controls;
  }

  getAllRoles(){
    this.service.getAllRoles().subscribe((data:any)=>{
      this.rolesData=data;
    })
  }

  getAllRegister(){
    this.service.getAllRegister().subscribe((data:any)=>{
      this.allRegisterList = data;
      this.dataSource =new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data);
    })
  }

  submitRegister(){
    if(this.register.invalid){
      return;
    }
    let roleInfo = Object.assign({},this.register.value.role_id);
    let registerValues = this.register.value;
    registerValues.role_id = roleInfo.roleId;
    registerValues.role_code = roleInfo.roleCode;
    registerValues.password = this.register.value.firstName+"@123456";

    this.service.addRegister(registerValues).subscribe((data)=>{
      console.log(data);
        this.getAllRegister();
    });
  }


  navigateToAdd(){
    this.router.navigate(['customer/dashboard/add-register']);
  }

  openDeleteDailog(templateRef:any,row:any){
    this.selectedDeleteInfo=row;
    let deleteDialogRef = this.dialog.open(templateRef, {
      width: '600px',
      disableClose: true
    });

    deleteDialogRef.afterClosed().subscribe(result => {
      console.log('The delete dialog was closed');
      this.selectedDeleteInfo={};
    });

  }

  confirmDelete(){
    this.service.deleteRegister(this.selectedDeleteInfo.customerId).subscribe((data:any)=>{
      if(data){
        this.selectedDeleteInfo={};
        this.getAllRegister();
        this.dialog.closeAll();
      }
    })
  }
}
