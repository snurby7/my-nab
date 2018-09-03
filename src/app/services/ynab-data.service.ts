import {
    Injectable,
} from '@angular/core';
import {
    TransactionDetail,
} from 'ynab';

import {
    IMonthlyTransactionTotal,
} from '../extensions/interface/monthly-transaction-total.interface';

@Injectable()
export class YnabDataService {
    public selectedBudgetId: string = null;

    public processTransactionsByMonth(transactions: TransactionDetail[]): IMonthlyTransactionTotal[] {
        const monthExpense: {[id: string]: IMonthlyTransactionTotal} = {};
        transactions.forEach(x => {
            const dateSplit = x.date.split('-'); // format is yyyy-mm-dd
            const month = +dateSplit[1] - 1; // month is 0 - 11 based, need to reset
            if (monthExpense[month]) {
                monthExpense[month].expense += x.amount / 1000;
                monthExpense[month].payees.push(x.payee_name);
            } else {
                const newDate = new Date();
                newDate.setFullYear(+dateSplit[0], month, 1);
                monthExpense[month] = {
                    expense: x.amount / 1000,
                    payees: [x.payee_name],
                    month: newDate
                };
            }
        });
        return Object.values(monthExpense);
    }
}
