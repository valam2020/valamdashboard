import { Component, OnInit, ViewChild } from '@angular/core';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit{
  title:string = "Roles";
  rolesData:any=[];
  displayedColumns = ['role', 'description',"roleCode","delete"];
  isAdd:boolean =true;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  addRole:FormGroup;
  editRole:FormGroup;
  selectedRoleInfo: any ={};
  selectedDeleteRoleInfo: any ={};
  
  constructor(private service:DispatcherService,private fb:FormBuilder,private dialog :MatDialog){
    this.addRole = this.fb.group({
      roleName:["",[Validators.required]],
      roleDescription:["",[Validators.required]],
      roleCode:["",[Validators.required]]
    });
    this.editRole = this.fb.group({
      roleName:["",[Validators.required]],
      roleDescription:["",[Validators.required]],
      roleCode:["",[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getAllRoles();
  }

 get f(){
  return this.addRole.controls;
 }

 get g(){
  return this.editRole.controls;
 }

  getAllRoles(){
    this.service.getAllRoles().subscribe((data:any)=>{
      this.rolesData=data;
      this.dataSource =new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  saveRole(){
      if(this.addRole.invalid){
        return;
      }

      let roles={
        roleName:this.addRole.controls['roleName'].value,
        roleDescription:this.addRole.controls['roleDescription'].value,
        roleCode:this.addRole.controls['roleCode'].value
      }

      this.service.saveRole(roles).subscribe((data:any)=>{
        this.getAllRoles();
        this.reset();
      })

  }


  editRoleForm(){
    if(this.editRole.invalid){
      return;
    }

    let roles={
      roleName:this.editRole.controls['roleName'].value,
      roleDescription:this.editRole.controls['roleDescription'].value,
      roleCode:this.editRole.controls['roleCode'].value,
      roleId:this.selectedRoleInfo.roleId
    }

    this.service.editRole(roles).subscribe((data:any)=>{
      this.isAdd=true;
      this.getAllRoles();
    })

}

  reset(){
    this.addRole.patchValue({
      roleName:"",
      roleDescription:"",
      roleCode:""
    });
    this.editRole.patchValue({
      roleName:"",
      roleDescription:"",
      roleCode:""
    });
  }

  enableEditForm(row:any){
    this.selectedRoleInfo = row;
    this.editRole.patchValue({
      roleName:row.roleName,
      roleDescription:row.roleDescription,
      roleCode:row.roleCode ?? ""
    });
    this.isAdd = false;
  }

  resetEditInfo()
  {
    this.editRole.patchValue({
      roleName:this.selectedRoleInfo.roleName,
      roleDescription:this.selectedRoleInfo.roleDescription,
      roleCode:this.selectedRoleInfo.roleCode ?? ""
    });
  }

  enableAddForm(){
    this.isAdd = true;
    this.selectedRoleInfo={};
  }

  enableDeletePopup(row:any){
    this.selectedDeleteRoleInfo = row;
  }

  openDeleteDailog(templateRef:any,row:any)
  {
    this.selectedDeleteRoleInfo=row;
    let deleteDialogRef = this.dialog.open(templateRef, {
      width: '600px',
      disableClose: true
    });

    deleteDialogRef.afterClosed().subscribe(result => {
      console.log('The delete dialog was closed');
      this.selectedDeleteRoleInfo={};
    });
  }



  confirmDelete(){
    this.service.deleteRole(this.selectedDeleteRoleInfo.roleId).subscribe((data:any)=>{
      this.getAllRoles();
      this.dialog.closeAll();
    })
  }

}
