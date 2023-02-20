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

  // get orders history from database
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

  if (ordersHistory.length === 0) {
    return (
      <div className='w-full md:mx-8'>
        <label className='ml-2 text-xs font-semibold'>Your orders history is empty.</label>
      </div>
    );
  } else {
    return (
      <div className='w-full md:mx-8'>
        <label className='ml-2 text-xs font-semibold'>latest orders</label>
        {ordersHistory.sort((a: IOrder, b: IOrder) => b.number - a.number).map(order => <HistoryItem order={order} />)}
      </div>
    );
  };
};
