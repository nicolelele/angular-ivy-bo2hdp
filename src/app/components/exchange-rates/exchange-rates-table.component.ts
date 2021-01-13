import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { ExchangeRatesService } from "../../services/exchange-rates.service";
import { Observable, Subscription } from "rxjs";
import { Rate, MultiRates } from "../../models/rates.model";

@Component({
  selector: "exchange-rates-table",
  templateUrl: "./exchange-rates-table.component.html"
})
export class ExchangeRatesTableComponent implements OnInit, OnDestroy {
  constructor(private exchangeRatesService: ExchangeRatesService) {}

  private REFRESH_INTERVAL = 10000;
  currentPage = 1;

  @Input() currency: string;
  data: MultiRates;
  subscription: Subscription;
  refreshInterval;

  ngOnInit() {
    this.refresh();
    this.refreshInterval = setInterval(
      () => this.refresh(),
      this.REFRESH_INTERVAL
    );
  }

  refresh() {
    this.subscription = this.exchangeRatesService
      .getRates(this.currency, this.currentPage)
      .subscribe(response => {
        this.data = response;
      });
  }

  previousPage() {
    this.currentPage = this.currentPage - 1;
    this.refresh();
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.refresh();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearInterval(this.refreshInterval);
  }
}
