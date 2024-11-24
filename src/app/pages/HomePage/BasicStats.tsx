import React, { memo } from 'react';
import {
  TrendingUp,
  Coins,
  DollarSign,
  BarChart2,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@mui/material';

interface BasicStatsPoint {
  currentPrice: number;
  circulatingSupply: number;
  totalSupply: number;
  totalVolume: number;
  marketCap: number;
}

interface BasicStatsProps {
  basicInfo: BasicStatsPoint;
}

const StatItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
    <div className="p-3 bg-purple-100 rounded-full">
      <Icon className="w-6 h-6 text-purple-600" />
    </div>
    <div className="ml-4">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export const BasicStats = memo(({ basicInfo }: BasicStatsProps) => {
  const stats = [
    {
      icon: TrendingUp,
      label: 'Current Price',
      value: `$${basicInfo.currentPrice.toLocaleString()} USD`,
    },
    {
      icon: Coins,
      label: 'Circulating Supply',
      value: basicInfo.circulatingSupply.toLocaleString(),
    },
    {
      icon: Activity,
      label: 'Total Supply',
      value: basicInfo.totalSupply.toLocaleString(),
    },
    {
      icon: BarChart2,
      label: 'Total Volume',
      value: `$${basicInfo.totalVolume.toLocaleString()}`,
    },
    {
      icon: DollarSign,
      label: 'Market Cap',
      value: `$${basicInfo.marketCap.toLocaleString()}`,
    },
  ];

  return (
    <Card className="max-w-4xl mx-auto bg-gray-50">
      <CardHeader>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Solana Charts
          </h2>
          <div className="w-16 h-1 mx-auto bg-purple-500 rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <blockquote className="italic text-gray-600">
            "Life's biggest gains often happen away from the charts."
            <footer className="mt-2 text-sm text-gray-500">— Anonymous</footer>
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
});

BasicStats.displayName = 'BasicStats';

export default BasicStats;
