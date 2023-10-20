import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        let userInfo:any = localStorage.getItem("userInfo");
        let userDetails:any = JSON.parse(userInfo);
        
        return next.handle(request.clone({
        headers: request.headers.set('common_token',(userDetails)? ( userDetails.auth_common_id == undefined)?"":userDetails.auth_common_id:"").set("Content-Type","application/json")
      }));
  }
}