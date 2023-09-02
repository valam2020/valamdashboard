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
}
