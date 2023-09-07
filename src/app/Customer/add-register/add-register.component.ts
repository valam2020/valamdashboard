import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-register',
  templateUrl: './add-register.component.html',
  styleUrls: ['./add-register.component.scss']
})
export class AddRegisterComponent implements OnInit{
  register!:FormGroup;
  rolesData: any = [];
  title:string = "Register";
  constructor(private service:DispatcherService,private fb:FormBuilder,private router:Router){
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
  }

  get f(){
    return this.register.controls;
  }

  getAllRoles(){
    this.service.getAllRoles().subscribe((data:any)=>{
      this.rolesData=data;
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
      if(data){
        this.router.navigate(['customer/dashboard/register']);
      }
    });
  }

}
