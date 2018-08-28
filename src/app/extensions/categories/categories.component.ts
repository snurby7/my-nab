import {
  Component,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
} from '@angular/material';
import {
  Category,
  CategoryGroupWithCategories,
  HybridTransaction,
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

  public categories: CategoryGroupWithCategories[] = [];
  public selectedCategory: CategoryGroupWithCategories = null;
  public selectedSubCategory: Category = null;
  public subCategories: Category[] = [];
  public transactions: HybridTransaction[] = [];
  public transactionsTotal = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private _matDialog: MatDialog,
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
          this.categories = categoryWrapper.data.category_groups.filter(x => !x.hidden || !x.deleted);
        }, error: error => this._ynabErrorService.processError(error)
      });
    }
  }

  public updateAllTransactions(): void {
    alert('2941 records later...this is off');
    // this._ynabAgent.getTransactionsByBudget(this._selectedBudgetId).subscribe({
    //   next: result => {
    //     this._firebaseService.updateTransactionDetails(result.data.transactions);
    //   }, error: error => this._ynabErrorService.processError(error)
    // });
  }

  public prepareSubCategory(): void {
    this.subCategories = this.selectedCategory.categories;
  }

  public prepareTransactions(): void {
    if (!this.selectedSubCategory) { return; }
    const currentDate = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    this._ynabAgent.getTransactionsBySubCategoryId(this._selectedBudgetId, this.selectedSubCategory.id, firstDay).subscribe({
      next: dataWrapper => {
        this.transactions = dataWrapper.data.transactions;
        this._firebaseService.updateTransactions(this.transactions);
        this.transactionsTotal = this.transactions.reduce((accumulator, transaction) =>
          accumulator + transaction.amount
        , 0) / 1000;
      }, error: error => this._ynabErrorService.processError(error)
    });
  }
}
