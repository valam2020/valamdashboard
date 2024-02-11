import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class HttpService {
 
  constructor(private httpClient: HttpClient) { }

  get(url:string){
    return this.httpClient.get(environment.apiUrl+url);
  }

  delete(url:string,id:number)
  {
     return this.httpClient.delete<any>(environment.apiUrl+url+'/'+id);
  }


  post(url:string,model:any)
  {
      return this.httpClient.post<any>(environment.apiUrl+url,model);
  }

  put(url:string,model:any)
  {
      return this.httpClient.put<any>(environment.apiUrl+url,model);
  }

}
