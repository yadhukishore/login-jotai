// swrConfig.js
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);

const swrConfig = {
  fetcher,
  onError: (error) => {
    console.error('SWR Error:', error);
  },
  revalidateOnFocus: true,
  dedupingInterval: 2000,
};

export default swrConfig;