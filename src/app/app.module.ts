import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { CustomerModule } from './Customer/customer/customer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { CustomerComponent } from './Customer/customer/customer-component/customer/customer.component';
import { RouterModule } from '@angular/router';
import { HttpService } from './Helpers/services/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientInterceptor } from './Helpers/services/httpclient.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomerModule,
  FormsModule,
  MaterialModule,
  ReactiveFormsModule,
  RouterModule,
  HttpClientModule,
  RouterModule
  ],
  providers: [HttpService,  
    { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
