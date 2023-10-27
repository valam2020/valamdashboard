import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DispatcherBehaviourService{
  constructor(){}
  private drivers = new BehaviorSubject<any>([]);
  driverObservable = this.drivers.asObservable();
  

  private cars = new BehaviorSubject<any>([]);
  carsObservable = this.cars.asObservable();
  
  private scheduler = new BehaviorSubject<any>([]);
  schedulerObservable = this.scheduler.asObservable();
  

  insertDrivers(driversList:any){
    this.drivers.next(driversList); 
  }

  insertCars(carsList:any){
    this.cars.next(carsList); 
  }

  insertScheduler(schedulerList:any){
    this.scheduler.next(schedulerList); 
  }
}