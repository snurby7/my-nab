import { Component } from '@angular/core';

import { YnabService } from './services/ynab.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']})
export class AppComponent {

  constructor(
    private _ynabService: YnabService
    ) {}

  public notClicked = true;
  public title = 'my-nab';

  public onExtensionsClicked(): void {
    this.notClicked = false;
    this._ynabService.getBudgets();
  }
}
