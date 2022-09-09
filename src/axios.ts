import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
