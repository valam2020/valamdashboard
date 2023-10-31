import { Injectable } from "@angular/core";

@Injectable()
export class AuthService { 

    constructor(){

    }

    isUserLoggedIn(){
        const userInfo:any = localStorage.getItem("userInfo");
        console.log(userInfo);
        if(userInfo){
            const customerUserInfo = JSON.parse(userInfo);
            if(customerUserInfo && customerUserInfo.auth_common_id){
                return true;
            }
        }
        return false;
    }

    getLoggedInUser(){

    }

}