import { Routes } from '@angular/router';
import { BudgetList } from './budget-list/budget-list';
import { CreateBudget } from './create-budget/create-budget';
import { EditBudget } from './edit-budget/edit-budget';
import { BudgetCharts } from './budget-charts/budget-charts';

export const routes: Routes = [
    { path: '', component: BudgetList },
    { path: 'create-budget', component: CreateBudget },
    { path: 'edit-budget/:budgetId', component: EditBudget },
    { path: 'budget-statistics/:budgetId', component: BudgetCharts }
];
