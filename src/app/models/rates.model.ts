export interface MultiRates {
  base: string;
  date: string;
  rates: Rate[];
  pagesCount: number;
}

export interface Rate {
  currency: string;
  value: number;
}