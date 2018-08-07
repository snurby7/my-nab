import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';

import { CategoriesComponent } from './categories/categories.component';
import { ExtensionsRoutingModule } from './extensions-routing.module';
import { ExtensionsAgent } from './extensions.agent';

@NgModule({
  imports: [
    MatButtonModule, CommonModule, ExtensionsRoutingModule
  ],
  declarations: [CategoriesComponent],
  providers: [ExtensionsAgent]
})
export class ExtensionsModule {}
