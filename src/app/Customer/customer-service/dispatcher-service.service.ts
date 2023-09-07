import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/Helpers/Constant';
import { HttpService } from 'src/app/Helpers/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class DispatcherService {

  constructor(private httpService:HttpService) {

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

}
