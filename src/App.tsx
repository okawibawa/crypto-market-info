import axiosClient from './axios';
import { useQuery } from '@tanstack/react-query';
import { useState, useContext, useDebugValue } from 'react';

// apis
import { useCoinMarkets } from './hooks/coin';

interface coinsMarkets {
  name: string;
  image: string;
  current_price: number;
  symbol: string;
  total_volume: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

const TextPercent = ({ percentage }: { percentage: number }) => {
  const formatPercent = new Intl.NumberFormat('id-Id', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(percentage / 100);

  return percentage > 0 ? (
    <p className="text-green-500">{formatPercent}</p>
  ) : (
    <p className="text-red-500">{percentage}</p>
  );
};

function App() {
  const [currPage, setCurrPage] = useState<number>(1);

  const coinsMarkets = useCoinMarkets(currPage);

  const formatter = new Intl.NumberFormat('id-Id', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  const handlePrevious = () => {
    setCurrPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    setCurrPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-8">
      <div className="mb-16">
        <p className="text-3xl font-semibold">Cryptocurrencies Prices</p>
        <p>Your cryptocurrencies price information.</p>
      </div>

      {coinsMarkets.isError && (
        <span className="mb-8 text-white bg-red-600 rounded p-1 inline-block">Failed fetching data.</span>
      )}

      <div className="w-full">
        <table className="w-full table-fixed mb-8">
          <thead>
            <tr>
              <th align="left">Coin</th>
              <th align="right">Current Price</th>
              <th align="right">24H % Change</th>
              <th align="right">Total Volume</th>
              <th align="right">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coinsMarkets.isError ? (
              <tr>
                <td className="flex items-center py-4" align="left">
                  -
                </td>
                <td align="right">-</td>
                <td align="right">-</td>
                <td align="right">-</td>
                <td align="right">-</td>
              </tr>
            ) : (
              <>
                {coinsMarkets.data?.map((coin: coinsMarkets) => (
                  <tr className="hover:bg-slate-100">
                    <td className="flex items-center py-4 px-1" align="left">
                      <img className="w-6 mr-2" src={coin.image} alt={coin.name} />
                      {coin.name}
                      <span className="p-1 ml-2 text-[.525rem] font-bold bg-slate-200 rounded">
                        {coin.symbol.toUpperCase()}
                      </span>
                    </td>
                    <td align="right">{formatter.format(coin.current_price)}</td>
                    <td align="right">
                      <TextPercent percentage={coin.price_change_percentage_24h} />
                    </td>
                    <td align="right">{formatter.format(coin.total_volume)}</td>
                    <td align="right">{formatter.format(coin.market_cap)}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>

        <div className="w-max ml-auto flex items-center">
          <button
            className={`w-32 py-1 px-2 border-2 ${
              currPage === 1 ? 'border-slate-200 text-slate-200' : 'border-slate-400 text-slate-400'
            } font-bold rounded`}
            disabled={currPage === 1 ? true : false}
            onClick={handlePrevious}
          >
            Previous
          </button>
          <p className="mx-4">{currPage}</p>
          <button
            className="w-32 py-1 px-2 border-2 border-slate-400 text-slate-400 font-bold rounded"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
