import { Component, OnInit } from '@angular/core';
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
    {
      link_name: "Roles",
      link: "/customer/dashboard/roles",
      icon: "fa fa-address-book",
      sub_menu: []
    }, 
    {
      link_name: "Register",
      link: "/customer/dashboard/register",
      icon: "fa fa-address-book",
      sub_menu:[]
      // sub_menu: [
      //       {
      //         link_name: "HTML & CSS",
      //         link: "/customer/dashboard/add-register",
      //       }
      //     ]
    }, 
    {
      link_name: "Timesheet",
      link: "/customer/dashboard/timesheet",
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

  constructor() { }

  ngOnInit() {

  }

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }
}
