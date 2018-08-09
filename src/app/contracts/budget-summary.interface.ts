import { ICurrencyFormat } from './currency-format.interface';
import { IDateFormat } from './date-format.interface';

export interface IBudgetSummary {
    id: string;
    name: string;
    lastModifiedOn: string;
    dateFormat: IDateFormat;
    currencyFormat: ICurrencyFormat;
}
