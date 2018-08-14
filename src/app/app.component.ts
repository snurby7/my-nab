import { Component } from '@angular/core';
import { BudgetSummary } from 'ynab';

import { YnabService } from './services/ynab.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']})
export class AppComponent {
  public budgets: BudgetSummary[] = [];

  constructor(
    private _ynabService: YnabService
    ) {
      this._ynabService.getBudgets().subscribe({
        next: results => this.budgets = results.data.budgets,
        error: error => console.log(error)
      });
    }

  public notClicked = true;
  public title = 'my-nab';
}
