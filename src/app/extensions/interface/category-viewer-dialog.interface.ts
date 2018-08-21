import { CategoryGroupWithCategories } from 'ynab';

export interface ICategoryViewerDialog  {
    category: CategoryGroupWithCategories;
    budgetId: string;
}
