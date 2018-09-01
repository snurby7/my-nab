import {
  Component,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Category,
  CategoryGroupWithCategories,
  TransactionDetail,
} from 'ynab';

import {
  YnabAgent,
} from '../../agent/ynab.agent';
import {
  YnabErrorService,
} from '../../services/error.service';
import {
  FirebaseService,
} from '../../services/firebase.service';
import {
  YnabDataService,
} from '../../services/ynab-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent  {
  private _selectedBudgetId: string = null;

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;

  public selectedCategory: CategoryGroupWithCategories = null;
  public selectedSubCategory: Category = null;
  public subCategories: Category[] = [];
  public transactions: TransactionDetail[] = [];
  public transactionsTotal = 0;

  public get categories() { return this._firebaseService.categories; }

  constructor(
    private _formBuilder: FormBuilder,
    private _firebaseService: FirebaseService,
    private _ynabAgent: YnabAgent,
    private _ynabDataService: YnabDataService,
    private _ynabErrorService: YnabErrorService
  ) {
    this._selectedBudgetId = this._ynabDataService.selectedBudgetId;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    if (this._selectedBudgetId) {
      this._ynabAgent.getCategoriesByBudgetId(this._selectedBudgetId).subscribe({
        next: categoryWrapper => {
          this._firebaseService.updateCategoryCollection(categoryWrapper.data.category_groups);
        }, error: error => this._ynabErrorService.processError(error)
      });
    }
  }

  public prepareSubCategory(): void {
    this.subCategories = this.selectedCategory.categories;
  }

  public prepareTransactions(): void {
    if (!this.selectedSubCategory) { return; }
    const currentDate = new Date();
    const lowerBound = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

    this._firebaseService.queryTransactionsByDate(this.selectedSubCategory.id, lowerBound).subscribe({
      next: results => {
        // will need to process these here since FB doesn't like my queries.
        // TODO create an actual backend.
        this.transactions = results;
        this.transactionsTotal = this.transactions.reduce((accumulator, transaction) =>
          accumulator + transaction.amount
        , 0) / 1000;
        console.log(results);
      }, error: error => console.log(error)
    });
  }
}
