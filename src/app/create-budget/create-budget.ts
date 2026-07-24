import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-budget',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-budget.html',
  styleUrl: './create-budget.css',
})
export class CreateBudget {
  private router = inject(Router);
  private budgetService = inject(BudgetService);

  budgetForm: FormGroup;

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(private formBuilder: FormBuilder) {
    this.budgetForm = this.formBuilder.group({
      title: [''],
      total: [''],
      year: [''],
      expenses: this.formBuilder.array([])
    })
  }

  get expenses(): FormArray {
    return this.budgetForm.get("expenses") as FormArray;
  }

  createExpense(): FormGroup {
    return this.formBuilder.group({
      name: "",
      value: "",
      month: ""
    })
  }

  addExpense() {
    this.expenses.push(this.createExpense());
  }

  deleteExpense(index: number) {
    this.expenses.removeAt(index);
  }

  resetForm() {
    this.budgetForm.reset();
  }

  cancelForm() {
    this.router.navigateByUrl('');
  }

  submitForm() {
    console.log(this.budgetForm.value);
    this.budgetService.createBudget(this.budgetForm.value).subscribe(res => {
      console.log("attempt made!");
      this.router.navigateByUrl('');
    })
  }
}
