import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CategoryGroupWithCategories } from 'ynab';

import { YnabAgent } from '../../agent/ynab.agent';
import { YnabDataService } from '../../services/ynab-data.service';
import { CategoryViewerDialogComponent } from '../dialogs/category-viewer-dialog.component';
import { ICategoryViewerDialog } from '../interface/category-viewer-dialog.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private _selectedBudgetId: string = null;
  public categories: CategoryGroupWithCategories[] = [];

  constructor(
    private _matDialog: MatDialog,
    private _ynabAgent: YnabAgent,
    private _ynabDataService: YnabDataService
  ) {
    this._selectedBudgetId = this._ynabDataService.selectedBudgetId;
  }

  public ngOnInit(): void {
    if (this._selectedBudgetId) {
      this._ynabAgent.getCategoriesByBudgetId(this._selectedBudgetId).subscribe({
        next: categoryWrapper => {
          this.categories = categoryWrapper.data.category_groups.filter(x => !x.hidden || !x.deleted);
        }, error: error => console.log(error)
      });
    }
  }

  public openCategory(category: CategoryGroupWithCategories): void {
    this._matDialog.open(CategoryViewerDialogComponent, {
      width: '300px',
      data: <ICategoryViewerDialog>{
        category,
        budgetId: this._selectedBudgetId
      }
    });
  }
}
