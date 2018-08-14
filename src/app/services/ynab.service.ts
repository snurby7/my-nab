import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import * as ynab from 'ynab';

import { Config } from '../../data/config.enum';
import { BudgetSummaryResponse } from 'ynab';

@Injectable()
export class YnabService {
    public ynabAPI: any;

    constructor(
    ) {
        this.ynabAPI = new ynab.API(Config.token);
    }

    public getBudgets(): Observable<BudgetSummaryResponse> {
        return from(this.ynabAPI.budgets.getBudgets());
    }
}
