import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import * as ynab from 'ynab';

import { Config } from '../../data/config.enum';
import { BudgetSummaryResponse, CategoriesResponse } from 'ynab';

@Injectable()
export class YnabAgent {
    public ynabAPI: any;

    constructor(
    ) {
        this.ynabAPI = new ynab.API(Config.token);
    }

    public getBudgets(): Observable<BudgetSummaryResponse> {
        return from(this.ynabAPI.budgets.getBudgets());
    }

    public getCategoriesByBudgetId(budgetId: string): Observable<CategoriesResponse> {
        return from(this.ynabAPI.categories.getCategories(budgetId));
    }
}
