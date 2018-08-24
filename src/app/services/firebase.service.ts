import {
    Injectable,
} from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
} from 'angularfire2/firestore';
import {
    Observable,
} from 'rxjs/internal/Observable';
import {
    BudgetSummary,
} from 'ynab';


@Injectable()
export class FirebaseService {
    private budgetCollection: AngularFirestoreCollection<BudgetSummary>;

    public budgets: Observable<BudgetSummary[]>;
    constructor(
        private _angularFireStore: AngularFirestore
    ) {
        this.budgetCollection = this._angularFireStore.collection<BudgetSummary>('budgets');
        this.budgets = this.budgetCollection.valueChanges();
    }

    public updateBudgets(budgets: BudgetSummary[]): void {
        // this does not update, need to figure this out.
        // budgets.forEach(x => this.budgetCollection.add(x));
    }

}
