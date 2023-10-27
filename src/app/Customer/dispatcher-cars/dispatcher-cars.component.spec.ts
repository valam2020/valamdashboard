import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherCarsComponent } from './dispatcher-cars.component';

describe('DispatcherCarsComponent', () => {
  let component: DispatcherCarsComponent;
  let fixture: ComponentFixture<DispatcherCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatcherCarsComponent]
    });
    fixture = TestBed.createComponent(DispatcherCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
