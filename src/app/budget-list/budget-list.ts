import { Component, OnInit, signal } from '@angular/core';
import { BudgetService } from '../services/budget-service';
import type { Budget } from '../types';

@Component({
  selector: 'app-budget-list',
  imports: [],
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

  ngOnInit(): void {
    this.getBudgets();
  }
}
