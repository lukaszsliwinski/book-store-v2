import { useState, useEffect } from 'react';
import axios from 'axios';

import { IBookInCart } from './types';

export default function Cart({ token }: { token: String }) {
  const [cart, setCart] = useState<IBookInCart[]>();
  const [empty, setEmpty] = useState('');

  useEffect(() => {
    const axiosShowCartConf = {
      method: 'get',
      url: '/show-cart',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    axios(axiosShowCartConf)
      .then((result) => {
        if (result.data.cart.length === 0) {
          setEmpty('cart is empty')
        } else {
          setCart(result.data.cart);
          setEmpty('');
        };
      })
      .catch((err) => {
        err = new Error();
      });
  }, []);

  return (
    <>
      {cart ?
      cart.map(item => {
        return (
          <>
            <div>{item.title}</div>
            <div>{item.authors}</div>
            <div>{item.price}</div>
            <div>{item.amount}</div>
          </>
        );
      }) :
      <div>{empty}</div>}
    </>
  );
};
