import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget-service';

@Component({
  selector: 'app-create-budget',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-budget.html',
  styleUrl: './create-budget.css',
})
export class CreateBudget {
  budgetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private budgetService: BudgetService) {
    this.budgetForm = this.formBuilder.group({
      title: [''],
      total: [''],
      year: [''],
      expenses: this.formBuilder.array([])
    })
  }

  get expenses(): FormArray {
    return this.budgetForm.get("expenses") as FormArray
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

  submitForm() {
    console.log(this.budgetForm.value);
    this.budgetService.createBudget(this.budgetForm.value).subscribe(res => {
      console.log("attempt made!")
    })
  }

  resetForm() {
    this.budgetForm.reset();
  }
}
