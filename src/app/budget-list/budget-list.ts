import { Component, inject, OnInit, signal } from '@angular/core';
import { BudgetRow } from '../budget-row/budget-row';
import { BudgetService } from '../services/budget-service';
import type { Budget } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-list',
  imports: [BudgetRow],
  templateUrl: './budget-list.html',
  styleUrl: './budget-list.css',
})

export class BudgetList implements OnInit {
  private router = inject(Router);

  constructor(private budgetService: BudgetService) { }

  budgets = signal<Budget[]>([])

  createBudget() {
    this.router.navigateByUrl("create-budget");
  }

  getBudgets() {
    this.budgetService.fetchBudgets().subscribe(res => {
      this.budgets.set(res)
    })
  }

  editBudget(budgetId: number) {
    this.router.navigate(['edit-budget', budgetId]);
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
