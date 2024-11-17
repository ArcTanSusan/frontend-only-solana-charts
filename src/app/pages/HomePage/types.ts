export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface PriceChangeDataPoint {
  price_change: number;
  time: string;
}

export interface AllTimeDataPoint {
  ath: number;
  atl: number;
  currency_symbol: string;
}

export interface MarketCapPoint {
  market_cap: number;
  currency_symbol: string;
}

export interface BasicStatsPoint {
  currentPrice: number;
  circulatingSupply: number;
  totalSupply: number;
  totalVolume: number;
  marketCap: number;
}
