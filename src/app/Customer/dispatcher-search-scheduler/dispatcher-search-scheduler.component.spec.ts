import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherSearchSchedulerComponent } from './dispatcher-search-scheduler.component';

describe('DispatcherSearchSchedulerComponent', () => {
  let component: DispatcherSearchSchedulerComponent;
  let fixture: ComponentFixture<DispatcherSearchSchedulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatcherSearchSchedulerComponent]
    });
    fixture = TestBed.createComponent(DispatcherSearchSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
