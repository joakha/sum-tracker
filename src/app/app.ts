import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BudgetList } from './budget-list/budget-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BudgetList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sum-tracker');
}
