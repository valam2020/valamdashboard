import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherDropdownComponent } from './dispatcher-dropdown.component';

describe('DispatcherDropdownComponent', () => {
  let component: DispatcherDropdownComponent;
  let fixture: ComponentFixture<DispatcherDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatcherDropdownComponent]
    });
    fixture = TestBed.createComponent(DispatcherDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
