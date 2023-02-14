import { useState, useEffect } from 'react';
import axios from 'axios';

import HistoryItem from './HistoryItem';
import { IOrder } from './types'
import { getToken } from './utils';

export default function History() {
  // local state
  const [ordersHistory, setOrdersHistory] = useState<IOrder[]>([]);

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
        if (orders.length !== 0) setOrdersHistory(orders);
      })
      .catch((error) => {
        error = new Error;
      });
  }, []);

  return (
    <div className='mt-6 w-[400px]'>
      <label className='ml-4 text-xs font-semibold'>latest orders</label>
      <div>
        {ordersHistory.length === 0 ?
          <div className='text-xs font-semibold'>your orders history is empty</div> :
          ordersHistory.map(order => <HistoryItem order={order} />)
        }
      </div>
    </div>
  );
};
