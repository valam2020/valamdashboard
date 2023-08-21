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
      link: "/dashboard",
      icon: "fa fa-home",
      sub_menu: []
    }, {
      link_name: "Category",
      link: null,
      icon: "fa fa-home",
      sub_menu: [
        {
          link_name: "HTML & CSS",
          link: "/html-n-css",
        }, {
          link_name: "JavaScript",
          link: "/javascript",
        }, {
          link_name: "PHP & MySQL",
          link: "/php-n-mysql",
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit() {

  }

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }
}
