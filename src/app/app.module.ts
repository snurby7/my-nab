import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { YnabAgent } from './agent/ynab.agent';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YnabDataService } from './services/ynab-data.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers : [
    YnabAgent,
    YnabDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
