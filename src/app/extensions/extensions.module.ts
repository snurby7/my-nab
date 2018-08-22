import {
  CommonModule,
} from '@angular/common';
import {
  NgModule,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatButtonModule,
} from '@angular/material';
import {
  MatDialogModule,
} from '@angular/material/dialog';
import {
  MatSelectModule,
} from '@angular/material/select';
import {
  MatStepperModule,
} from '@angular/material/stepper';

import {
  CategoriesComponent,
} from './categories/categories.component';
import {
  CategoryViewerDialogComponent,
} from './dialogs/category-viewer-dialog.component';
import {
  ExtensionsRoutingModule,
} from './extensions-routing.module';
import {
  ExtensionsAgent,
} from './extensions.agent';

@NgModule({
  imports: [
    CommonModule,
    ExtensionsRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CategoriesComponent,
    CategoryViewerDialogComponent
  ],
  entryComponents: [
    CategoryViewerDialogComponent
  ],
  providers: [ExtensionsAgent]
})
export class ExtensionsModule {}
