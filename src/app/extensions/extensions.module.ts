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
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
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
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CategoriesComponent,
  ],
  entryComponents: [
  ],
  providers: [ExtensionsAgent]
})
export class ExtensionsModule {}
