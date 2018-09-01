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
  CategoryGroupWithCategories,
  HybridTransaction,
  TransactionDetail,
} from 'ynab';

interface IBase {
    id: string;
}

@Injectable()
export class FirebaseService {
    public budgets: Observable<BudgetSummary[]>;
    public categories: Observable<CategoryGroupWithCategories[]>;
    public transactions: Observable<TransactionDetail[]>;

    private readonly _budgetCollectionKey = 'budgets';
    private readonly _categoryCollectionKey = 'categories';
    private readonly _transactionCollectionKey = 'transactions';
    private readonly _transactionDetailCollectionKey = 'transactionDetails';

    private budgetCollection: AngularFirestoreCollection<BudgetSummary>;
    private categoryCollection: AngularFirestoreCollection<CategoryGroupWithCategories>;
    private transactionCollection: AngularFirestoreCollection<TransactionDetail>;

    constructor(
        private _angularFireStore: AngularFirestore
    ) {
        this.budgetCollection = this._angularFireStore.collection<BudgetSummary>(this._budgetCollectionKey);
        this.categoryCollection = this._angularFireStore.collection<CategoryGroupWithCategories>(this._categoryCollectionKey);
        this.transactionCollection = this._angularFireStore.collection<TransactionDetail>(this._transactionDetailCollectionKey);
        this.budgets = this.budgetCollection.valueChanges();
        this.categories = this.categoryCollection.valueChanges();
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

    public updateCategoryCollection(categories: CategoryGroupWithCategories[]): void {
        this.updateRefs<CategoryGroupWithCategories>(categories, this._categoryCollectionKey);
    }

    public queryTransactionsByDate(subCategoryId: string, lowerBound: Date): Observable<TransactionDetail[]> {
        return this._angularFireStore.collection(
            this._transactionDetailCollectionKey,
            ref => ref.orderBy('date')
                .where('date', '>=', this.processDateForFirebase(lowerBound) )
                .where('category_id', '==', subCategoryId )
        ).valueChanges()  as Observable<TransactionDetail[]>;
    }

    private updateRefs<T>(data: T[], collectionKey: string): void {
        data.forEach((x: any) => {
            const budgetRef = this._angularFireStore.collection(collectionKey).doc(`${x.id}`);
            budgetRef.set(x, { merge: true});
        });
    }

    private processDateForFirebase(date: Date): string {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let formattedDay = `${day}`;
        let formattedMonth = `${month}`;
        if (month < 10) { formattedMonth = `0${month}`; }
        if (day < 10) { formattedDay = `0${day}`; }
        return `${date.getFullYear()}-${formattedMonth}-${formattedDay}`;
    }
}
