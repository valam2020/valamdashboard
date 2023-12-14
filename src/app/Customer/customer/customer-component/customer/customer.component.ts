import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{
  openSidebar: boolean = true;

  menuSidebar = [
    {
      link_name: "Dashboard",
      link: "/customer/dashboard/home",
      icon: "fa fa-home",
      sub_menu: []
    }, 
    {
      link_name: "Dispatcher",
      link: "/customer/dashboard/dispatcher",
      icon: "fa fa-address-book",
      sub_menu: []
    }, 
    // {
    //   link_name: "Roles",
    //   link: "/customer/dashboard/roles",
    //   icon: "fa fa-address-book",
    //   sub_menu: []
    // }, 
    // {
    //   link_name: "Register",
    //   link: "/customer/dashboard/register",
    //   icon: "fa fa-address-book",
    //   sub_menu:[]
    // }, 
    // {
    //   link_name: "Timesheet",
    //   link: "/customer/dashboard/timesheet",
    //   icon: "fa fa-calendar",
    //   sub_menu: []
    // }, 
    {
      link_name: "Decline Rides",
      link: "/customer/dashboard/decline-rides",
      icon: "fa fa-calendar",
      sub_menu: []
    },
    {
      link_name: "Dispatcher Drivers",
      link: "/customer/dashboard/dispatcher-search-driver",
      icon: "fa fa-calendar",
      sub_menu: []
    },
    {
      link_name: "Dispatcher Cars",
      link: "/customer/dashboard/dispatcher-search-car",
      icon: "fa fa-calendar",
      sub_menu: []
    },
    {
      link_name: "Logout",
      link: "/",
      icon: "fa fa-calendar",
      sub_menu: []
    }  
    // {
    //   link_name: "Category",
    //   link: null,
    //   icon: "fa fa-home",
    //   sub_menu: [
    //     {
    //       link_name: "HTML & CSS",
    //       link: "/html-n-css",
    //     }, {
    //       link_name: "JavaScript",
    //       link: "/javascript",
    //     }, {
    //       link_name: "PHP & MySQL",
    //       link: "/php-n-mysql",
    //     }
    //   ]
    // }
  ]

  constructor(public router:Router) { }

  ngOnInit() {

  }

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

  redirectEvent(item:any){
    if(item.link_name == "Logout"){
      localStorage.clear();
      this.router.navigateByUrl('/'); 
    }
  }
}
