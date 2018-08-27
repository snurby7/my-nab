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
    HybridTransaction,
} from 'ynab';

interface IBase {
    id: string;
}

@Injectable()
export class FirebaseService {
    private budgetCollection: AngularFirestoreCollection<BudgetSummary>;

    private readonly _budgetCollectionKey = 'budgets';
    private readonly _transactionCollectionKey = 'transactions';
    public budgets: Observable<BudgetSummary[]>;
    constructor(
        private _angularFireStore: AngularFirestore
    ) {
        this.budgetCollection = this._angularFireStore.collection<BudgetSummary>(this._budgetCollectionKey);
        this.budgets = this.budgetCollection.valueChanges();
    }

    public updateBudgets(budgets: BudgetSummary[]): void {
        this.updateRefs<BudgetSummary>(budgets, this._budgetCollectionKey);
    }

    public updateTransactions(transactions: HybridTransaction[]): void {
        this.updateRefs<HybridTransaction>(transactions, this._transactionCollectionKey);
    }

    private updateRefs<T>(data: T[], collectionKey: string): void {
        data.forEach((x: any) => {
            const budgetRef = this._angularFireStore.collection(collectionKey).doc(`${x.id}`);
            budgetRef.set(x, { merge: true});
        });
    }
}
