import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget-service';
import { Expense } from '../types';

@Component({
  selector: 'app-edit-budget',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-budget.html',
  styleUrl: './edit-budget.css',
})
export class EditBudget implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private budgetService = inject(BudgetService)
  private cdr = inject(ChangeDetectorRef);

  readonly budgetId: number;
  budgetForm: FormGroup;

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(private formBuilder: FormBuilder) {
    this.budgetId = Number(this.route.snapshot.paramMap.get('budgetId'));

    this.budgetForm = this.formBuilder.group({
      id: [''],
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

  createExistingExpense(expense: Expense) {
    return this.formBuilder.group({
      name: expense.name,
      value: expense.value,
      month: expense.month
    })
  }

  addExpense() {
    this.expenses.push(this.createExpense());
  }

  deleteExpense(index: number) {
    this.expenses.removeAt(index);
  }

  ngOnInit(): void {
    console.log(this.budgetId);

    this.budgetService.fetchBudget(this.budgetId).subscribe(res => {
      this.budgetForm.patchValue({
        id: res.id,
        title: res.title,
        total: res.total,
        year: res.year,
      })

      res.expenses.forEach(expense => {
        this.expenses.push(this.createExistingExpense(expense))
      })

      this.cdr.markForCheck();
    })
  }

  resetForm() {
    this.budgetForm.reset();
  }

  cancelForm() {
    this.router.navigateByUrl('');
  }

  submitForm() {
    this.budgetService.editBudget(this.budgetId, this.budgetForm.value).subscribe(res => {
      this.router.navigateByUrl('');
    })
  }
}
