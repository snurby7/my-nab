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
} from 'ynab';

import {
  FirebaseService,
} from '../../services/firebase.service';
import {
  YnabDataService,
} from '../../services/ynab-data.service';
import {
  IMonthlyTransactionTotal,
} from '../interface/monthly-transaction-total.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent  {
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public startDate = new Date();

  public categories: CategoryGroupWithCategories[] = [];
  public selectedSubCategory: Category = null;
  public subCategories: Category[] = [];
  public monthlyTransactionTotals: IMonthlyTransactionTotal[] = [];
  public monthlyAverage = 0;
  public transactionsTotal = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private _firebaseService: FirebaseService,
    private _ynabDataService: YnabDataService
  ) {
    this._firebaseService.getVisibleMasterCategories().subscribe({
      next: categories => this.categories = categories,
      error: error => console.log(error)
    });
    // need to bring back a notion of a selected budget, probably a guard.
    this.firstFormGroup = this._formBuilder.group({
      categoryCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      categoryCtrl: ['', Validators.required],
      dateCtrl: [this.startDate, Validators.required]
    });
  }

  public prepareSubCategory(): void {
    this.subCategories = this.firstFormGroup.value.categoryCtrl.categories;
  }

  public prepareTransactions(): void {
    this.selectedSubCategory = this.secondFormGroup.value.categoryCtrl;
    this.startDate = <Date>(this.secondFormGroup.value.dateCtrl);
    this._firebaseService.queryTransactionsByDate(this.selectedSubCategory.id, this.startDate).subscribe({
      next: results => {
        // will need to process these here since FB doesn't like my queries.
        // TODO create an actual backend.
        this.monthlyTransactionTotals = this._ynabDataService.processTransactionsByMonth(results);
        this.transactionsTotal = this.monthlyTransactionTotals
          .reduce((accumulator, monthlyTransactionTotal) => accumulator + monthlyTransactionTotal.expense, 0);
        this.monthlyAverage = this.transactionsTotal / this.monthlyTransactionTotals.length;
      }, error: error => console.log(error)
    });
  }
}
