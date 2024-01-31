import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DispatcherService } from '../Customer/customer-service/dispatcher-service.service';
import { ApiUrls } from '../Helpers/Constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // form: FormGroup = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // });
  loginForm:FormGroup;
  submit:boolean = false;
  loaderSubmit: boolean = false;
  constructor(private fb:FormBuilder,private router:Router,private service:DispatcherService){
   this.loginForm = this.fb.group({
    userName:['',Validators.required],
    password:['',Validators.required]
   })
  }

  get f()
  {
    return this.loginForm.controls;
  }

  submitLoginForm(){
    this.submit = false;
    if(this.loginForm.invalid)
    {
      this.submit = true;
      return;
    }

    this.loaderSubmit = true;
    let login ={
      email :this.loginForm.value.userName,
      password: this.loginForm.value.password
      }
  
      this.service.post(ApiUrls.customer_login.login,login).subscribe((data:any)=>{
        this.loaderSubmit = false;
        if(data){
          localStorage.setItem("userInfo",JSON.stringify(data));
          this.router.navigateByUrl('/customer/dashboard/home');
        }
        else{
          this.service.errorSnackBar("Username and Password invalid!!!");
        }
      },(error:any)=>{
        this.loaderSubmit = false;
        this.service.errorSnackBar("Username and Password invalid");
      })
  }
}
