import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherSearchDriverComponent } from './dispatcher-search-driver.component';

describe('DispatcherSearchDriverComponent', () => {
  let component: DispatcherSearchDriverComponent;
  let fixture: ComponentFixture<DispatcherSearchDriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatcherSearchDriverComponent]
    });
    fixture = TestBed.createComponent(DispatcherSearchDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
