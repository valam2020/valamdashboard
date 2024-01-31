import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/Helpers/Constant';
import { HttpService } from 'src/app/Helpers/services/http.service';
import {
  MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class DispatcherService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private httpService:HttpService,private snackBar:MatSnackBar) {

   }

   getDispatcher():Observable<any>{
    return this.httpService.get(ApiUrls.dispatcher.getAll);
   }

   addDispatcher(dispatcher:any):Observable<any>{
      return this.httpService.post(ApiUrls.dispatcher.add,dispatcher);
   }

   updateDispatcher(dispatcher:any):Observable<any>{
    return this.httpService.post(ApiUrls.dispatcher.update,dispatcher);
   }

   deleteDispatcher(dispatcherDto:any):Observable<any>{
    return this.httpService.post(ApiUrls.dispatcher.delete,dispatcherDto)
   }

   getAllRoles():Observable<any>{
    return this.httpService.get(ApiUrls.roles.all);
   }

   saveRole(roleModel:any):Observable<any>{
      return this.httpService.post(ApiUrls.roles.create,roleModel);
   }

   editRole(roleModel:any):Observable<any>{
    return this.httpService.post(ApiUrls.roles.update,roleModel);
   }

   deleteRole(id:any):Observable<any>{
    return this.httpService.delete(ApiUrls.roles.delete,id);
   }

  addRegister(register:any):Observable<any>{
    return this.httpService.post(ApiUrls.customer_login.signup,register);
  }

  getAllRegister():Observable<any>{
    return this.httpService.get(ApiUrls.customer_login.all);
  }

  deleteRegister(id:any):Observable<any>{
    return this.httpService.delete(ApiUrls.customer_login.delete,id);
  }

  updateRegister(register:any):Observable<any>{
    return this.httpService.post(ApiUrls.customer_login.update,register);
  }

  getAllDeclineRides():Observable<any>{
    return this.httpService.post(ApiUrls.ride.declineRides,{});
  }

  get(url:string):Observable<any>{
    return this.httpService.get(url);
  }

  post(url:string,body:any):Observable<any>{
    return this.httpService.post(url,body);
  }

  openSnackBar(message:any){
    this.snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:1000
    });
  }

  errorSnackBar(message:any){
    this.snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:1000,
      panelClass:['error-snackbar']
    });
  }
}
