import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyWithComponent } from './buy-with.component';

describe('BuyWithComponent', () => {
  let component: BuyWithComponent;
  let fixture: ComponentFixture<BuyWithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyWithComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyWithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
