import { Component, inject, OnInit, signal } from '@angular/core';
import { BudgetService } from '../services/budget-service';
import { ActivatedRoute } from '@angular/router';
import { Budget } from '../types';
import { months } from '../utils';
import { Chart, registerables, ChartConfiguration } from "chart.js"

Chart.register(...registerables);

@Component({
  selector: 'app-budget-charts',
  imports: [],
  templateUrl: './budget-charts.html',
  styleUrl: './budget-charts.css',
})
export class BudgetCharts implements OnInit {
  private route = inject(ActivatedRoute);
  private budgetService = inject(BudgetService)

  readonly budgetId: number;

  loadingChart = signal<boolean>(true);

  constructor() {
    this.budgetId = Number(this.route.snapshot.paramMap.get('budgetId'));
  }

  initChart(budget: Budget): void {
    const expensesByMonth: number[] = []

    months.forEach((month) => {
      const budgetExpensesForMonth = budget.expenses.filter(expense => expense.month === month);
      let totalCosts = 0;
      budgetExpensesForMonth.forEach((expense) => {
        totalCosts += expense.value;
      })

      expensesByMonth.push(totalCosts);
    })

    const chartConfig: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: `${budget.title} — ${budget.year} expenses`,
            data: expensesByMonth,
            borderColor: '#d97706',
            backgroundColor: '#fde68a',
            tension: 0.4,
            fill: true,
            pointRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: `${budget.title} (${budget.year})` },
        },
        scales: {
          y: {
            ticks: { callback: (value) => `${value}€` },
          },
        },
      },
    };

    new Chart('budgetCanvas', chartConfig);
  }

  ngOnInit(): void {
    this.budgetService.fetchBudget(this.budgetId).subscribe(res => {
      this.initChart(res);
      this.loadingChart.set(false);
    })
  }
}
