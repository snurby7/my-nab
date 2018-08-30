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
    public budgets: Observable<BudgetSummary[]>;
    public transactions: Observable<TransactionDetail[]>;

    private readonly _budgetCollectionKey = 'budgets';
    private readonly _transactionCollectionKey = 'transactions';
    private readonly _transactionDetailCollectionKey = 'transactionDetails';

    private budgetCollection: AngularFirestoreCollection<BudgetSummary>;
    private transactionCollection: AngularFirestoreCollection<TransactionDetail>;

    constructor(
        private _angularFireStore: AngularFirestore
    ) {
        this.budgetCollection = this._angularFireStore.collection<BudgetSummary>(this._budgetCollectionKey);
        this.transactionCollection = this._angularFireStore.collection<TransactionDetail>(this._transactionDetailCollectionKey);
        this.budgets = this.budgetCollection.valueChanges();
        this.transactions = this.transactionCollection.valueChanges();
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

    public queryTransactionsByDate(lowerBound: Date, upperBound: Date): void {
        const tempCollection = this._angularFireStore.collection(
            this._transactionDetailCollectionKey,
            ref => ref.where('date', '>=', '2018-08-24' ).where('date', '<=', '2018-08-25')
        );
        // const ref = this.transactionCollection.ref.where('date', '>=', lowerBound); // .where('date', '<=', upperBound);
        tempCollection.valueChanges().subscribe(x => console.log(x));
    }

    private updateRefs<T>(data: T[], collectionKey: string): void {
        data.forEach((x: any) => {
            const budgetRef = this._angularFireStore.collection(collectionKey).doc(`${x.id}`);
            budgetRef.set(x, { merge: true});
        });
    }

}
