import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { alertActions } from '../store/alertSlice';
import HistoryItem from './HistoryItem';
import { IOrder } from '../types'
import { getToken } from '../utils';

export default function History() {
  // local state
  const [ordersHistory, setOrdersHistory] = useState<IOrder[]>([]);

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setError = (value: boolean) => dispatch(alertActions.setError(value));
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));

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
      .catch(() => {
        setError(true);
        setAlertMessage('Database connection error - please try again later!');
        setShowAlert(true);
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
