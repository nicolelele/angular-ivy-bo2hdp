import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Rate, MultiRates } from "../models/rates.model";
import { Observable } from "rxjs";

export interface ExchangeRatesResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

@Injectable()
export class ExchangeRatesService {
  
  private readonly BASE_URL = 'https://api.exchangeratesapi.io/latest?base=';
  private readonly ITEMS_PER_PAGE = 5;

  constructor(private http: HttpClient) { }

  getRates(currency: string, page = 1): Observable<MultiRates> {
    return this.http.get<ExchangeRatesResponse>(`${this.BASE_URL}${currency}`)
      .pipe(
        map(response => {
          return {
            ...response,
            rates: Object.entries(response.rates)
            .map(([currency, value]) => ({ currency, value }))
            .slice(this.ITEMS_PER_PAGE * (page - 1), this.ITEMS_PER_PAGE * page),

            pagesCount: Math.round(Object.keys(response.rates).length / this.ITEMS_PER_PAGE)
          }
        })
      );
  }
}