import { useState, useEffect } from 'react';

import { IBookInCart } from './types';

export default function Cart({ token }: { token: string }) { // token będzie potrzebny przy składaniu zamówienia (auth endpoint)
  const [cart, setCart] = useState<IBookInCart[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [empty, setEmpty] = useState('');

  useEffect(() => {
    cart.length === 0 ? setEmpty('your cart is empty') : setEmpty('');
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);

  const minusOne = (bookId: string) => {
    const newCart = [...cart];
    const book : IBookInCart = newCart.find((item: IBookInCart) => item.bookId === bookId) as IBookInCart;
    if (book.amount > 1) {
      book.amount -= 1;
      newCart.map((item: IBookInCart) => {
        return (item.bookId === book.bookId) ? book : item;
      });
    } else {
      for (let i = 0; i < newCart.length; i++) {
        if ( newCart[i].bookId === bookId) newCart.splice(i, 1);
      };
    };
    setCart(newCart);
  };

  const plusOne = (bookId: string) => {
    const newCart = [...cart];
    const book : IBookInCart = newCart.find((item: IBookInCart) => item.bookId === bookId) as IBookInCart;
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
      <div>{empty}</div>
    </>
  );
};
