import * as React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Box, Tab } from '@mui/material';
import styled from 'styled-components/macro';

import { Tabs } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import CommentSection from './Comments';
import BasicSelect from './BasicSelect';
import {
  AllTimeDataPoint,
  MarketCapPoint,
  PriceChangeDataPoint,
} from './types';
import { formatLargeNumber } from './utils';
import CustomTabPanel from './CustomTabPanel';
import { BasicStats } from './BasicStats';

const API_URL = `https://api.coingecko.com/api/v3/coins/solana?x_cg_demo_api_key=CG-rUJtbFHyD1xXdaf5MWNwt56K`;

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceData, setPriceData] = useState([]);
  const [allTimeDataByCountryCurrency, setAllTimeDataByCountryCurrency] =
    useState([]);
  const [marketCapByCountryCurrency, setMarketCapByCountryCurrency] = useState(
    [],
  );
  const [basicInfo, setBasicInfo] = useState({
    currentPrice: 0,
    totalSupply: 0,
    circulatingSupply: 0,
    totalVolume: 0,
    marketCap: 0,
  });
  const [value, setValue] = React.useState(0);
  const [countryCurrencies, setCountryCurrencies] = useState([]);

  const dropdownOptions = countryCurrencies.map(curr => ({
    value: curr,
    label: curr,
  }));

  const removeCountryCurrency = event => {
    const countryCurrToRemove = event.target.value.toLowerCase();
    setCountryCurrencies(prevCurrencies =>
      prevCurrencies.filter(curr => curr !== countryCurrToRemove),
    );
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const getPercentagePriceChanges = useCallback(data => {
    // Transform the API response into the required format for 3D viz
    const percentagePriceChanges: Array<PriceChangeDataPoint> = [
      {
        price_change: data.price_change_percentage_24h,
        time: '24h',
      },
      {
        price_change: data.price_change_percentage_7d,
        time: '7d',
      },
      {
        price_change: data.price_change_percentage_14d,
        time: '14d',
      },
      {
        price_change: data.price_change_percentage_30d,
        time: '30d',
      },
      {
        price_change: data.price_change_percentage_60d,
        time: '60d',
      },
      {
        price_change: data.price_change_percentage_200d,
        time: '200d',
      },
      {
        price_change: data.price_change_percentage_1y,
        time: '1y',
      },
    ];
    return percentagePriceChanges;
  }, []);

  const getAllTimeDataByCountryCurrency = useCallback(
    (data, countryCurrencies) => {
      // Transform the API response into the required format for 3D viz
      const allTimeData: Array<AllTimeDataPoint> = countryCurrencies.map(
        currency => {
          return {
            ath: data.market_data.ath[currency],
            atl: data.market_data.atl[currency],
            currency_symbol: currency,
          };
        },
      );
      return allTimeData;
    },
    [],
  );

  const getMarketCapByCountryCurrency = useCallback(
    (data, countryCurrencies) => {
      // Transform the API response into the required format for 3D viz
      const marketCapData: Array<MarketCapPoint> = countryCurrencies.map(
        currency => {
          return {
            market_cap: data.market_data.market_cap[currency],
            currency_symbol: currency,
          };
        },
      );
      return marketCapData;
    },
    [],
  ); // Empty dependency array since we want this to run once on mount

  useEffect(() => {
    const POLLING_INTERVAL = 120000;
    const fetchPriceData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const transformedData = getPercentagePriceChanges(data.market_data);
        setBasicInfo({
          currentPrice: data.market_data.current_price.usd,
          circulatingSupply: data.market_data.circulating_supply,
          totalSupply: data.market_data.total_supply,
          totalVolume: data.market_data.total_volume.usd,
          marketCap: data.market_data.market_cap.usd,
        });
        // TODO: Create proper type TS interfaces
        setCountryCurrencies((Object.keys(data.market_data.ath) as any) || []);
        setPriceData(transformedData as any);
        setAllTimeDataByCountryCurrency(
          getAllTimeDataByCountryCurrency(data, countryCurrencies) as any,
        );
        setMarketCapByCountryCurrency(
          getMarketCapByCountryCurrency(data, countryCurrencies) as any,
        );
        setLoading(false);
        setError('');
      } catch (err) {
        setError('Failed to fetch Solana price data.');
        console.error('Failed to fetch Solana price data.');
      }
    };
    fetchPriceData();

    // Set up interval for real-time updates (every 2mins)
    const intervalId = window.setInterval(fetchPriceData, POLLING_INTERVAL);
    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []); // Empty dependency array since we want this to run once on mount

  // Effect to update all-time data and market cap data when countryCurrencies changes
  // TODO: Make use of a redux-like global store to track API response of API_URL such that
  // I can re-use getAllTimeDataByCountryCurrency() and getMarketCapByCountryCurrency() inside
  // removeCountryCurrency().
  useEffect(() => {
    if (countryCurrencies.length > 0) {
      const fetchData = async () => {
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          setAllTimeDataByCountryCurrency(
            getAllTimeDataByCountryCurrency(data, countryCurrencies) as any,
          );
          setMarketCapByCountryCurrency(
            getMarketCapByCountryCurrency(data, countryCurrencies) as any,
          );
        } catch (err) {
          console.error('Failed to fetch additional data:', err);
        }
      };
      fetchData();
    }
  }, [
    countryCurrencies,
    getAllTimeDataByCountryCurrency,
    getMarketCapByCountryCurrency,
  ]);

  return (
    <WrapperDiv>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">Error: {error}</div>}
      <BasicStats
        basicInfo={{
          currentPrice: basicInfo.currentPrice,
          circulatingSupply: basicInfo.circulatingSupply,
          totalSupply: basicInfo.totalSupply,
          totalVolume: basicInfo.totalVolume,
          marketCap: basicInfo.marketCap,
        }}
      />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs"
          >
            <Tab label="Price delta over time" {...a11yProps(0)} />
            <Tab label="ATL & ATH by country currency" {...a11yProps(1)} />
            <Tab label="Market cap by country currency" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ResponsiveContainer width="100%" height={600}>
            <BarChart width={150} height={40} data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip
                formatter={(value: number) =>
                  `${parseFloat(String(value)).toFixed(2)}%`
                }
              />
              <Legend />
              <Bar dataKey="price_change" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ResponsiveContainer width="100%" height={600}>
            <BarChart
              width={500}
              height={300}
              data={allTimeDataByCountryCurrency}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="currency_symbol" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="atl" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="ath" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <BasicSelect
            items={dropdownOptions}
            handleChange={event => removeCountryCurrency(event)}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ResponsiveContainer width="100%" height={600}>
            <BarChart
              width={500}
              height={300}
              data={marketCapByCountryCurrency}
              margin={{
                top: 20,
                right: 30,
                left: 60,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="currency_symbol" />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#8884d8"
                tickFormatter={formatLargeNumber}
              />
              <Tooltip
                formatter={(value: number) => [
                  `${formatLargeNumber(value)}`,
                  'Market Cap',
                ]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="market_cap" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <BasicSelect
            items={dropdownOptions}
            handleChange={event => removeCountryCurrency(event)}
          />
        </CustomTabPanel>
      </Box>
      <CommentSection />
    </WrapperDiv>
  );
};

export default HomePage;

const WrapperDiv = styled.div`
  padding: 50px;
`;
