import axiosClient from '../axios';
import { coinsMarketsDto } from './dto';

export default class Coin {
  constructor() {}

  getCoinMarkets = async (page: number) => {
    try {
      const result = await axiosClient.get(
        `coins/markets?vs_currency=idr&order=market_cap_desc&per_page=50&page=${page}&sparkline=false`
      );

      return result.data;
    } catch (error) {
      throw new Error();
    }
  };
}
