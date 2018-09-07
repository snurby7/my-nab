import {
  NgModule,
} from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  ExtensionHomeComponent,
} from './extension-home/extension-home.component';

const routes: Routes = [
  {
    path: '',
    component: ExtensionHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtensionsRoutingModule {}
