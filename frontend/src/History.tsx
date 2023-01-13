import { useState, useEffect } from 'react';
import axios from 'axios';

import HistoryItem from './HistoryItem';

export default function History({ token }: { token: string }) {
  const [ordersHistory, setOrdersHistory] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const axiosHistoryConfig = {
      method: 'get',
      url: '/history',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    axios(axiosHistoryConfig)
      .then((result) => {
        const orders = result.data.history;
        console.log(result.data.history);
        if (orders.length === 0) {
          // komunikat o braku zamówień
        } else {
          // create list of components
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
    <>
      <h4>Orders history</h4>
      <div>{ordersHistory}</div>
    </>
  );
};
