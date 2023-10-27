import { Component, OnInit } from '@angular/core';
import { DispatcherBehaviourService } from '../customer-service/dispatcher-subject.service';

@Component({
  selector: 'app-dispatcher-cars',
  templateUrl: './dispatcher-cars.component.html',
  styleUrls: ['./dispatcher-cars.component.scss']
})
export class DispatcherCarsComponent implements OnInit{

  carsList:any = [];
  constructor(private dispatcherBehaviourSubject:DispatcherBehaviourService){

  }

  ngOnInit(): void {
    this.dispatcherBehaviourSubject.carsObservable.subscribe((data:any)=>{
      this.carsList = data;
      console.log(this.carsList);
    });
  }

}
