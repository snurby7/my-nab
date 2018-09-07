import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import * as ynab from 'ynab';

import { Config } from '../../data/config.enum';
import { BudgetSummaryResponse, CategoriesResponse, CategoryResponse, HybridTransactionsResponse, TransactionsResponse, MonthDetailResponse, MonthSummariesResponse } from 'ynab';

@Injectable()
export class YnabAgent {
    public ynabAPI: ynab.api;

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

    public getCategoryById(budgetId: string, categoryId: string, options: any = {}): Observable<CategoryResponse> {
        return from(this.ynabAPI.categories.getCategoryById(budgetId, categoryId, options));
    }

    public getTransactionsBySubCategoryId(
        budgetId: string, subCategoryId: string, sinceDate?: Date, type?: any
    ): Observable<HybridTransactionsResponse> {
        return from(this.ynabAPI.transactions.getTransactionsByCategory(budgetId, subCategoryId, sinceDate, type));
    }

    public getTransactionsByBudget(budgetId: string): Observable<TransactionsResponse> {
        return from(this.ynabAPI.transactions.getTransactions(budgetId));
    }

    public getBudgetMonths(budgetId: string): Observable<MonthSummariesResponse> {
        return from(this.ynabAPI.months.getBudgetMonths(budgetId));
    }
}
