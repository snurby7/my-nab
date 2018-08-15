import { Component, OnInit } from '@angular/core';
import { CategoryGroupWithCategories } from 'ynab';

import { YnabAgent } from '../../agent/ynab.agent';
import { YnabDataService } from '../../services/ynab-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories: CategoryGroupWithCategories[] = [];

  constructor(
    private _ynabAgent: YnabAgent,
    private _ynabDataService: YnabDataService
  ) {

  }

  public ngOnInit() {
    const selectedBudgetId = this._ynabDataService.selectedBudgetId;
    if (selectedBudgetId) {
      this._ynabAgent.getCategoriesByBudgetId(selectedBudgetId).subscribe({
        next: categoryWrapper => {
          this.categories = categoryWrapper.data.category_groups.filter(x => !x.hidden || !x.deleted);
        }, error: error => console.log(error)
      });
    }
  }
}
