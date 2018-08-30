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
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    public title = 'my-nab';

    constructor(
        private _router: Router,
        private _ynabDataService: YnabDataService,
        public firebaseService: FirebaseService
    ) {
    }

    public selectBudget(budget: BudgetSummary): void {
        this._ynabDataService.selectedBudgetId = budget.id;
        this._router.navigate(['/extensions']);
    }

    public queryTransactions() {
        const currentDate = new Date();
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        this.firebaseService.queryTransactionsByDate(firstDay, currentDate);
    }
}
