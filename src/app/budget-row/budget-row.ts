import { Component, inject, input, output, signal } from '@angular/core';
import { Budget } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-row',
  imports: [],
  templateUrl: './budget-row.html',
  styleUrl: './budget-row.css',
})
export class BudgetRow {
  private router = inject(Router);

  budget = input.required<Budget>();

  deleteBudgetEmitter = output<Budget>();

  showExpenses = signal<boolean>(false);

  viewStatistics() {
    this.router.navigate(['budget-statistics', this.budget().id]);
  }

  editBudget() {
    this.router.navigate(['edit-budget', this.budget().id]);
  }

  deleteBudget() {
    this.deleteBudgetEmitter.emit(this.budget());
  }
}
