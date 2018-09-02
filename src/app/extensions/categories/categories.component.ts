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
  TransactionDetail,
} from 'ynab';

import {
  FirebaseService,
} from '../../services/firebase.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent  {
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public startDate = new Date();

  public selectedSubCategory: Category = null;
  public subCategories: Category[] = [];
  public transactions: TransactionDetail[] = [];
  public transactionsTotal = 0;

  public get categories() { return this._firebaseService.categories; }

  constructor(
    private _formBuilder: FormBuilder,
    private _firebaseService: FirebaseService,
  ) {
    // need to bring back a notion of a selected budget, probably a guard.
    this.firstFormGroup = this._formBuilder.group({
      categoryCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      categoryCtrl: ['', Validators.required],
      dateCtrl: ['', Validators.required]
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
        this.transactions = results;
        this.transactionsTotal = this.transactions.reduce((accumulator, transaction) =>
          accumulator + transaction.amount
        , 0) / 1000;
      }, error: error => console.log(error)
    });
  }
}
