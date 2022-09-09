import { useQuery } from '@tanstack/react-query';
import Coin from '../api/coins';
import { coinsMarketsDto } from '../api/dto';

const coin = new Coin();

export const useCoinMarkets = (page: number) => {
  return useQuery(['coins', 'markets', page], {
    queryFn: () => coin.getCoinMarkets(page),
    staleTime: 60000,
    refetchInterval: 6000,
  });
};
