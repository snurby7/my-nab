import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetSummary } from 'ynab';

import { YnabAgent } from './agent/ynab.agent';
import { YnabDataService } from './services/ynab-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']})
export class AppComponent {
  public budgets: BudgetSummary[] = [];
  public notClicked = true;
  public title = 'my-nab';

  constructor(
    private _router: Router,
    private _ynabAgent: YnabAgent,
    private _ynabDataService: YnabDataService
  ) {
      this._ynabAgent.getBudgets().subscribe({
        next: results => this.budgets = results.data.budgets,
        error: error => console.log(error)
      });
    }

    public selectBudget(budget: BudgetSummary): void {
      this.notClicked = false; // NOTE: this is a hack and I don't like it.
      this._ynabDataService.selectedBudgetId = budget.id;
      this._router.navigate(['/extensions']);
    }
}
