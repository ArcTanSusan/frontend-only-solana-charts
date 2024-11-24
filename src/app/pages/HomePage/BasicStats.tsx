import React, { memo } from 'react';
import {
  TrendingUp,
  Coins,
  DollarSign,
  BarChart2,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@mui/material';
import styled from 'styled-components';

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

const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

// Styled components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  transition: box-shadow 0.2s ease;
`;

const IconContainer = styled.div`
  background-color: #e9d8fd;
  border-radius: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
`;

const Label = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
`;

const Value = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
`;

const StatItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <Container>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.15rem',
      }}
    >
      <IconContainer>
        <Icon style={{ width: '1.25rem', height: '0.5rem' }} />
      </IconContainer>
      <Label>{label}:</Label>
      <Value>{value}</Value>
    </div>
  </Container>
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
      value: basicInfo.totalVolume.toLocaleString(),
    },
    {
      icon: DollarSign,
      label: 'Market Cap',
      value: `$${basicInfo.marketCap.toLocaleString()}`,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h2>Solana Charts</h2>
      </CardHeader>
      <CardContent>
        <CardTitle>Basic Stats about Solana</CardTitle>
        <Subtitle>Real-time statistics and market data</Subtitle>
        <div>
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
        <blockquote>
          "Life's biggest gains often happen away from the charts."
          <footer>— Anonymous</footer>
        </blockquote>
      </CardContent>
    </Card>
  );
});

BasicStats.displayName = 'BasicStats';

export default BasicStats;
