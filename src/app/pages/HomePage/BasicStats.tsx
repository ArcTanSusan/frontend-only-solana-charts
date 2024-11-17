import React, { memo } from 'react';
import { BasicStatsPoint } from './types';

interface BasicStatsProps {
  basicInfo: BasicStatsPoint;
}

export const BasicStats = memo(({ basicInfo }: BasicStatsProps) => (
  <>
    <h1>Solana Charts</h1>
    <h2>
      Current Price of Solana: ${basicInfo.currentPrice.toLocaleString()} USD
    </h2>
    <h2>
      Circulating Supply: ${basicInfo.circulatingSupply.toLocaleString()} USD
    </h2>
    <h2>Total Supply: ${basicInfo.totalSupply.toLocaleString()} USD</h2>
    <h2>Total Volume: ${basicInfo.totalVolume.toLocaleString()} USD</h2>
    <h2>Market Cap: ${basicInfo.marketCap.toLocaleString()} USD</h2>
    <h4>
      "Life's biggest gains often happen away from the charts." --Anonymous
    </h4>
  </>
));

BasicStats.displayName = 'BasicStats';
