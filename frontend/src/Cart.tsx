import { useState, useEffect } from 'react';
import axios from 'axios';

import { IBookInCart } from './types';

export default function Cart({ token, setBadge }: { token: string, setBadge: React.Dispatch<React.SetStateAction<number>> }) {
  const [cart, setCart] = useState<IBookInCart[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setBadge(cart.length);

    if (cart.length !== 0) {
      let sum = 0;
      cart.map((item: IBookInCart) => {
        sum += item.price * item.amount
      });

      // round sum to 2 decimals and set total state
      sum = Math.round(sum * 100) / 100;
      setTotal(sum);
    };
  }, [cart]);

  const minusOne = (bookId: string) => {
    const newCart = [...cart];
    const book: IBookInCart = newCart.find((item: IBookInCart) => item.bookId === bookId) as IBookInCart;
    if (book.amount > 1) {
      book.amount -= 1;
      newCart.map((item: IBookInCart) => {
        return (item.bookId === book.bookId) ? book : item;
      });
    } else {
      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].bookId === bookId) newCart.splice(i, 1);
      };
    };
    setCart(newCart);
  };

  const plusOne = (bookId: string) => {
    const newCart = [...cart];
    const book: IBookInCart = newCart.find((item: IBookInCart) => item.bookId === bookId) as IBookInCart;
    if (book.amount < 5) {
      book.amount += 1;
    };
    setCart(newCart);
  };

  const removeFromCart = (bookId: string) => {
    const newCart = [...cart];
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].bookId === bookId) newCart.splice(i, 1);
    };
    setCart(newCart);
  };

  const makeOrder = () => {
    const axiosMakeOrderConfig = {
      method: 'post',
      url: '/order',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        cart: cart,
        total: total
      }
    };

    axios(axiosMakeOrderConfig)
      .then((result) => {
        console.log(result); // przekierowanie na stronę potwierdzającą złożenie zamówienia - przy tworzeniu frontu
        setCart([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {cart.map(item => {
        return (
          <>
            <div>{item.title}</div>
            <div>{item.authors}</div>
            <div>{item.price}</div>
            <div>{item.amount}</div>
            <button onClick={() => minusOne(item.bookId)}>minus</button>
            <button onClick={() => plusOne(item.bookId)}>plus</button>
            <button onClick={() => removeFromCart(item.bookId)}>remove</button>
          </>
        );
      })}
      {cart.length === 0 ?
        <div>your cart is empty</div> :
        <>
          <div>total: {total}</div>
          <div>
            <button onClick={() => makeOrder()}>order</button>
          </div>
        </>}
    </>
  );
};
