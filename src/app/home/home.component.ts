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
    FirebaseService,
} from '../services/firebase.service';
import {
    YnabDataService,
} from '../services/ynab-data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    public title = 'my-nab';

    public get budgets() { return this._firebaseService.budgets; }
    // don't do this async, it goes poorly.
    // public get budgets() { return this._ynabAgent.getBudgets() }

    constructor(
        private _router: Router,
        private _firebaseService: FirebaseService,
        private _ynabDataService: YnabDataService
    ) { }

    public selectBudget(budget: BudgetSummary): void {
        this._ynabDataService.selectedBudgetId = budget.id;
        this._router.navigate(['/extensions']);
    }
}
