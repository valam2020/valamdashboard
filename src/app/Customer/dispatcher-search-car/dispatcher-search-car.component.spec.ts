import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherSearchCarComponent } from './dispatcher-search-car.component';

describe('DispatcherSearchCarComponent', () => {
  let component: DispatcherSearchCarComponent;
  let fixture: ComponentFixture<DispatcherSearchCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatcherSearchCarComponent]
    });
    fixture = TestBed.createComponent(DispatcherSearchCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
