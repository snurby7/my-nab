import {
  Component,
  OnInit,
} from '@angular/core';

import {
  FirebaseService,
} from '../../services/firebase.service';

@Component({
  selector: 'app-monthly-budget',
  templateUrl: './monthly-budget.component.html',
  styleUrls: ['./monthly-budget.component.scss']
})
export class MonthlyBudgetComponent implements OnInit {

  constructor(
    private _fireBaseService: FirebaseService,
  ) { }

  public ngOnInit() {
    this._fireBaseService.monthSummaries.subscribe(result => {
      // do some processing on this data soon.
    });
  }
}
