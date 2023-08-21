import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb:FormBuilder,private router:Router){
   this.loginForm = this.fb.group({
    userName:['',Validators.required],
    password:['',Validators.required]
   })
  }

  submitLoginForm(){
    this.router.navigateByUrl('/customer/dashboard/home');
  }
}
