import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent {

  constructor(private _router: Router) {}

  public notClicked = true;
  public title = 'my-nab';

  public onExtensionsClicked(): void {
    this.notClicked = false;
    this
      ._router
      .navigate(['/extensions']);

  }
}
