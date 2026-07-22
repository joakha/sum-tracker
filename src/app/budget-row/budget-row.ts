import { Component, input, output, signal } from '@angular/core';
import { Budget } from '../types';

@Component({
  selector: 'app-budget-row',
  imports: [],
  templateUrl: './budget-row.html',
  styleUrl: './budget-row.css',
})
export class BudgetRow {

  budget = input.required<Budget>();

  editBudgetEmitter = output<number>()
  deleteBudgetEmitter = output<Budget>();

  showExpenses = signal<boolean>(false);

  editBudget(budgetId: number) {
    this.editBudgetEmitter.emit(budgetId);
  }

  deleteBudget() {
    this.deleteBudgetEmitter.emit(this.budget());
  }
}
