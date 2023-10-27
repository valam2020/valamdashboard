import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherSchedulersComponent } from './dispatcher-schedulers.component';

describe('DispatcherSchedulersComponent', () => {
  let component: DispatcherSchedulersComponent;
  let fixture: ComponentFixture<DispatcherSchedulersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatcherSchedulersComponent]
    });
    fixture = TestBed.createComponent(DispatcherSchedulersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
