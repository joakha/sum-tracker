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

  editBudget() {
    this.editBudgetEmitter.emit(this.budget().id);
  }

  deleteBudget() {
    this.deleteBudgetEmitter.emit(this.budget());
  }
}
