import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.scss']
})
export class HeroImageComponent {
  
  @Input() title:string="";

  constructor(){

  }
}
