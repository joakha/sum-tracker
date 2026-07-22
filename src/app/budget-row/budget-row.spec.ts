import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetRow } from './budget-row';

describe('BudgetRow', () => {
  let component: BudgetRow;
  let fixture: ComponentFixture<BudgetRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetRow],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
