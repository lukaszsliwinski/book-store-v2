import { useState, useEffect } from 'react';
import axios from 'axios';

import HistoryItem from './HistoryItem';
import { IOrder } from './types'
import { getToken } from './utils';

export default function History() {
  // local state
  const [ordersHistory, setOrdersHistory] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const token = getToken();

    const axiosHistoryConfig = {
      method: 'get',
      url: '/api/history',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    axios(axiosHistoryConfig)
      .then((result) => {
        const orders = result.data.history;
        if (orders.length === 0) {
          // komunikat o braku zamówień
        } else {
          // sort orders descending and create list of components
          orders.sort((a: IOrder, b: IOrder) => b.number - a.number);
          let components: JSX.Element[] = [];

          for (let i = 0; i < orders.length; i++) {
            components.push(
              <HistoryItem order={orders[i]} />
            );
          };
          setOrdersHistory(components)
        };
      })
      .catch((error) => {
        error = new Error;
      });
  }, []);

  return (
    <div className='mt-6 w-[400px]'>
      <label className='ml-4 text-xs font-semibold'>latest orders</label>
      <div>{ordersHistory}</div>
    </div>
  );
};
