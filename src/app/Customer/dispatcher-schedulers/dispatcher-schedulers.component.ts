import { Component, OnInit } from '@angular/core';
import { DispatcherBehaviourService } from '../customer-service/dispatcher-subject.service';

@Component({
  selector: 'app-dispatcher-schedulers',
  templateUrl: './dispatcher-schedulers.component.html',
  styleUrls: ['./dispatcher-schedulers.component.scss']
})
export class DispatcherSchedulersComponent  implements OnInit{

  schedulerList:any = [];
  constructor(private dispatcherBehaviourSubject:DispatcherBehaviourService){

  }

  ngOnInit(): void {
    this.dispatcherBehaviourSubject.schedulerObservable.subscribe((data:any)=>{
      this.schedulerList = data;
      console.log(this.schedulerList);
    });
  }

}
