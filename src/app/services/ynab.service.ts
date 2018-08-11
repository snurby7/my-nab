import { Injectable } from '@angular/core';
import * as ynab from 'ynab';

import { Config } from '../../data/config.enum';
import { IBudgetSummary } from '../contracts/budget-summary.interface';

@Injectable()
export class YnabService {
    public ynabAPI: any;

    constructor(
    ) {
        this.ynabAPI = new ynab.API(Config.token);
    }

    public getBudgets() {
        const ynabAPI = this.ynabAPI;
        (async () => {
            const budgetsResponse = await ynabAPI.budgets.getBudgets();
            const budgets: IBudgetSummary[] = budgetsResponse.data.budgets;
            for (const budget of budgets) {
              console.log(`Budget Name: ${budget.name}`);
            }
          })();
    }
}
