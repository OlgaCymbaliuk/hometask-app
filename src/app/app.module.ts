import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EstablishmentsService } from './establishments.service';

import * as $ from 'jquery';
import { AppComponent } from './app.component';
import { EstablishmentsComponent } from './establishments/establishments.component';
import { SimpleInputComponent } from './simple-input/simple-input.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { EstablishmentDetailComponent } from './establishment-detail/establishment-detail.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    EstablishmentsComponent,
    SimpleInputComponent,
    MultiselectComponent,
    EstablishmentDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
