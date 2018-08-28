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
    TransactionDetail,
} from 'ynab';

interface IBase {
    id: string;
}

@Injectable()
export class FirebaseService {
    private budgetCollection: AngularFirestoreCollection<BudgetSummary>;

    private readonly _budgetCollectionKey = 'budgets';
    private readonly _transactionCollectionKey = 'transactions';
    private readonly _transactionDetailCollectionKey = 'transactionDetails';
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

    public updateTransactionDetails(transactions: TransactionDetail[]): void {
        this.updateRefs<TransactionDetail>(transactions, this._transactionDetailCollectionKey);
    }

    private updateRefs<T>(data: T[], collectionKey: string): void {
        data.forEach((x: any) => {
            const budgetRef = this._angularFireStore.collection(collectionKey).doc(`${x.id}`);
            budgetRef.set(x, { merge: true});
        });
    }
}
