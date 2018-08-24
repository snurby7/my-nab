import {
    Component,
} from '@angular/core';
import {
    Router,
} from '@angular/router';
import {
    BudgetSummary,
} from 'ynab';

import {
    YnabAgent,
} from '../agent/ynab.agent';
import {
    FirebaseService,
} from '../services/firebase.service';
import {
    YnabDataService,
} from '../services/ynab-data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    private _budgets: BudgetSummary[] = [];
    public title = 'my-nab';

    constructor(
        private _router: Router,
        private _ynabAgent: YnabAgent,
        private _ynabDataService: YnabDataService,
        public firebaseService: FirebaseService
    ) {
    }

    public selectBudget(budget: BudgetSummary): void {
        this._ynabDataService.selectedBudgetId = budget.id;
        this._router.navigate(['/extensions']);
    }

    // TODO need to figure out how to update budgets and probably refresh them
    public updateBudgets() {
        this._ynabAgent.getBudgets().subscribe({
            next: results => {
                this._budgets = results.data.budgets;
                this.firebaseService.updateBudgets(this._budgets);
            },
            error: error => console.log(error)
        });
    }
}
