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
}
