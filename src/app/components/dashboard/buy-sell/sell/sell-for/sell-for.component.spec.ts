import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellForComponent } from './sell-for.component';

describe('SellForComponent', () => {
  let component: SellForComponent;
  let fixture: ComponentFixture<SellForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
