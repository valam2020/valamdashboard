import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DispatcherService } from '../customer-service/dispatcher-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-register',
  templateUrl: './add-register.component.html',
  styleUrls: ['./add-register.component.scss']
})
export class AddRegisterComponent implements OnInit{
  register!:FormGroup;
  editRegister!:FormGroup
  rolesData: any = [];
  title:string = "Register";
  isEditRegister:boolean = false;
  editObject:any = {};
  constructor(private service:DispatcherService,private fb:FormBuilder,private router:Router, private route:ActivatedRoute){
    this.register = this.fb.group({
      firstName:["",[Validators.required]],
      lastName:["",[Validators.required]],
      email:["",[Validators.required]],
      phoneNumber:["",[Validators.required]],
      role_id:["",[Validators.required]],
      reason:["",[Validators.required]],
      address:["",[Validators.required]]
    });

    this.editRegister = this.fb.group({
      firstName:["",[Validators.required]],
      lastName:["",[Validators.required]],
      email:["",[Validators.required]],
      phoneNumber:["",[Validators.required]],
      role_id:[""],
      reason:["",[Validators.required]],
      address:["",[Validators.required]]
    });

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
      this.getEditDetails();
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
      if(data){
        this.navigateToRegister();
      }
    });
  }

  getEditDetails(){
    this.editObject = this.route.snapshot.queryParams;
    if(this.editObject.customerId){
      this.isEditRegister = true;
      this.editRegister.patchValue({
        firstName: this.editObject.firstName,
        lastName: this.editObject.lastName,
        email: this.editObject.email,
        phoneNumber: this.editObject.phoneNumber,
        role_id: this.rolesData.filter((d:any)=>{return d.roleId == this.editObject.role_id})[0],
        reason: "",
        address: this.editObject.address
      });
    }
    else{
      this.isEditRegister = false; 
    }
  }

  navigateToRegister(){
    this.router.navigate(['customer/dashboard/register'])
  }

  updateRegister(){
    if(this.editRegister.invalid)
    {
        return;
    }

    let roleInfo = Object.assign({},this.editRegister.value.role_id);
    let registerValues = this.editRegister.value;
    registerValues.role_id = roleInfo.roleId;
    registerValues.role_code = roleInfo.roleCode;
    registerValues.customerId = this.editObject.customerId
    this.service.updateRegister(registerValues).subscribe((data)=>{
      if(data){
        this.navigateToRegister();
      }
    });

  }

}
