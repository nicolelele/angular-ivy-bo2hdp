import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ExchangeRatesTableComponent } from './components/exchange-rates/exchange-rates-table.component';
import { ExchangeRatesService } from './services/exchange-rates.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, ExchangeRatesTableComponent ],
  providers: [ExchangeRatesService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
