import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyBudgetComponent } from './monthly-budget.component';

describe('MonthlyBudgetComponent', () => {
  let component: MonthlyBudgetComponent;
  let fixture: ComponentFixture<MonthlyBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
