import { Component, OnInit, signal } from '@angular/core';
import { BudgetService } from '../services/budget-service';
import type { Budget } from '../types';
import { DeleteButton } from '../delete-button/delete-button';

@Component({
  selector: 'app-budget-list',
  imports: [DeleteButton],
  templateUrl: './budget-list.html',
  styleUrl: './budget-list.css',
})

export class BudgetList implements OnInit {

  constructor(private budgetService: BudgetService) { }

  budgets = signal<Budget[]>([])

  getBudgets() {
    this.budgetService.fetchBudgets().subscribe(res => {
      this.budgets.set(res)
    })
  }

  deleteBudget(budget: Budget) {
    if (confirm(`Are you sure you want to delete the budget "${budget.title}"`)) {
      this.budgetService.deleteBudget(budget.id).subscribe(res => {
        alert("Budget deleted!")
        const newBudgets = this.budgets().filter(budgetToInclude => budgetToInclude != budget);
        this.budgets.set(newBudgets);
      });
    }
  }

  ngOnInit(): void {
    this.getBudgets();
  }
}
