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

  constructor(private fb:FormBuilder,private router:Router,private service:DispatcherService){
   this.loginForm = this.fb.group({
    userName:['',Validators.required],
    password:['',Validators.required]
   })
  }

  submitLoginForm(){

    if(this.loginForm.invalid)
    {
      return;
    }

    let login ={
      email :this.loginForm.value.userName,
      password: this.loginForm.value.password
      }
  
      this.service.post(ApiUrls.customer_login.login,login).subscribe((data:any)=>{
        if(data){
          localStorage.setItem("userInfo",JSON.stringify(data));
          this.router.navigateByUrl('/customer/dashboard/home');
        }
      })
  }
}
