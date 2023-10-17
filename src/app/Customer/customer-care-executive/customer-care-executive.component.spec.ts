import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCareExecutiveComponent } from './customer-care-executive.component';

describe('CustomerCareExecutiveComponent', () => {
  let component: CustomerCareExecutiveComponent;
  let fixture: ComponentFixture<CustomerCareExecutiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerCareExecutiveComponent]
    });
    fixture = TestBed.createComponent(CustomerCareExecutiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
