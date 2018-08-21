import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { YnabAgent } from '../../agent/ynab.agent';
import { ICategoryViewerDialog } from '../interface/category-viewer-dialog.interface';

@Component({
    selector: 'app-category-viewer-dialog',
    templateUrl: 'category-viewer-dialog.component.html'
})
export class CategoryViewerDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<CategoryViewerDialogComponent>,
        public _ynabAgent: YnabAgent,
        @Inject(MAT_DIALOG_DATA) public data: ICategoryViewerDialog
    ) { }

    public ngOnInit() {
        this._ynabAgent.getCategoryById(this.data.budgetId, this.data.category.id).subscribe(result => {
            console.log(result);
        });
    }

    public onClose(): void {
        this.dialogRef.close();
    }
}
