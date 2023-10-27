import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherDriversComponent } from './dispatcher-drivers.component';

describe('DispatcherDriversComponent', () => {
  let component: DispatcherDriversComponent;
  let fixture: ComponentFixture<DispatcherDriversComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatcherDriversComponent]
    });
    fixture = TestBed.createComponent(DispatcherDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
