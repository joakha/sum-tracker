import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { Budget } from '../types';
import { Router } from '@angular/router';
import type { Expense } from '../types';
import { months } from '../utils';

@Component({
  selector: 'app-budget-row',
  imports: [],
  templateUrl: './budget-row.html',
  styleUrl: './budget-row.css',
})
export class BudgetRow implements OnInit {
  private router = inject(Router);

  budget = input.required<Budget>();

  sortedExpenses = signal<Expense[]>([]);

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

  ngOnInit(): void {
    const sortedExpenses: Expense[] = [];

    months.forEach((month) => {
      const monthlyExpenses = this.budget().expenses
      .filter((expense) => expense.month === month)
      .sort((a, b) => a.name.localeCompare(b.name));

      monthlyExpenses.forEach((expense) => {
        sortedExpenses.push(expense);
      })
    })

    this.sortedExpenses.set(sortedExpenses);
  }
}
