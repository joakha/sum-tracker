import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Budget } from '../types';

@Injectable({
  providedIn: 'root'
})

export class BudgetService {

  api_url: string = "http://localhost:3000/Budgets";

  constructor(private client: HttpClient) { }

  createBudget(budget: Budget) {
    return this.client.post(this.api_url, budget);
  }

  fetchBudgets() {
    return this.client.get<Budget[]>(this.api_url);
  }

  fetchBudget(budgetId: number) {
    return this.client.get<Budget>(`${this.api_url}/${budgetId}`);
  }

  editBudget(budgetId: number, updatedBudget: Budget) {
    return this.client.put(`${this.api_url}/${budgetId}`, updatedBudget);
  }

  deleteBudget(budgetId: number) {
    return this.client.delete(`${this.api_url}/${budgetId}`);
  }
}
