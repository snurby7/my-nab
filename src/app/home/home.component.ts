import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BudgetSummary } from 'ynab';

import { YnabAgent } from '../agent/ynab.agent';
import { YnabDataService } from '../services/ynab-data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    public budgets: BudgetSummary[] = [];
    public title = 'my-nab';

    constructor(
        private _router: Router,
        private _ynabAgent: YnabAgent,
        private _ynabDataService: YnabDataService
    ) {
        this._ynabAgent.getBudgets() .subscribe({
            next: results => this.budgets = results.data.budgets,
            error: error => console.log(error)
        });
    }

    public selectBudget(budget: BudgetSummary): void {
        this._ynabDataService.selectedBudgetId = budget.id;
        this._router.navigate(['/extensions']);
    }
}
