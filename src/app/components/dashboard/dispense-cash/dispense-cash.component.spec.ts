import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispenseCashComponent } from './dispense-cash.component';

describe('DispenseCashComponent', () => {
  let component: DispenseCashComponent;
  let fixture: ComponentFixture<DispenseCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispenseCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispenseCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
