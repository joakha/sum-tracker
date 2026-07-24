import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCharts } from './budget-charts';

describe('BudgetCharts', () => {
  let component: BudgetCharts;
  let fixture: ComponentFixture<BudgetCharts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetCharts],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetCharts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
