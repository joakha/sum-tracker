import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Budget } from '../types';

@Injectable({
  providedIn: 'root'
})

export class BudgetService {

  api_url : string = "http://localhost:3000/Budgets";

  constructor(private client: HttpClient) { }

  fetchBudgets(){
    return this.client.get<Budget[]>(this.api_url);
  }

  createBudget(budget : Budget){
    return this.client.post(this.api_url, budget);
  }

  deleteBudget(budgetId: number){
    return this.client.delete(`${this.api_url}/${budgetId}`);
  }


  // rxResource = rxResource({
  //   loader : () => this.http.get(this.base_url)
  // })

/*   

  getDataById(id : number){
    return this.http.get<Iuser>(`${this.base_url}/${id}`);
  }

  putDataById(id : number, data: Iuser){
    return this.http.put(`${this.base_url}/${id}`,data);
  }
   */
}
