import {
  HttpClientModule,
} from '@angular/common/http';
import {
  NgModule,
} from '@angular/core';
import {
  MatNativeDateModule,
} from '@angular/material';
import {
  BrowserModule,
} from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import {
  AngularFireModule,
} from 'angularfire2';
import {
  AngularFirestoreModule,
} from 'angularfire2/firestore';

import {
  FirebaseConfig,
} from '../data/firebase.config';
import {
  YnabAgent,
} from './agent/ynab.agent';
import {
  AppRoutingModule,
} from './app-routing.module';
import {
  AppComponent,
} from './app.component';
import {
  YnabErrorService,
} from './services/error.service';
import {
  FirebaseService,
} from './services/firebase.service';
import {
  YnabDataService,
} from './services/ynab-data.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatNativeDateModule
  ],
  providers : [
    FirebaseService,
    YnabAgent,
    YnabDataService,
    YnabErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
