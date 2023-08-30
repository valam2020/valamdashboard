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
}
