import { useState, useEffect } from 'react';
import axios from 'axios';

import { ReactComponent as ArrowUp } from './assets/arrowup.svg';
import { ReactComponent as ArrowDown } from './assets/arrowdown.svg';
import { ReactComponent as Bin } from './assets/bin.svg';
import Btn from './Btn';
import { IBook } from './types';

export default function Cart({ token, setBadge }: { token: string, setBadge: React.Dispatch<React.SetStateAction<number>> }) {
  const [cart, setCart] = useState<IBook[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setBadge(cart.length);

    if (cart.length !== 0) {
      let sum = 0;
      cart.map((item: IBook) => {
        sum += item.price * item.amount
      });

      // round sum to 2 decimals and set total state
      sum = Math.round(sum * 100) / 100;
      setTotal(sum);
    };
  }, [cart]);

  const minusOne = (bookId: string) => {
    const newCart = [...cart];
    const book: IBook = newCart.find((item: IBook) => item.bookId === bookId) as IBook;
    if (book.amount > 1) {
      book.amount -= 1;
      newCart.map((item: IBook) => {
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
    const book: IBook = newCart.find((item: IBook) => item.bookId === bookId) as IBook;
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
      url: '/api/order',
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
    <div className='block p-6 rounded-lg shadow-lg bg-white mx-auto my-4 md:max-w-[600px]'>
      {cart.map(item => {
        return (
          <div className='flex items-center justify-between my-1.5'>
            <div className='font-bold text-sm'>{item.title}</div>
            <div className='flex items-center'>
              <div className='flex items-center border mx-1 px-2'>
                <div className='font-medium text-lg'>{item.amount}</div>
                <div className='inline-flex flex-col ml-2'>
                  <button onClick={() => plusOne(item.bookId)}><ArrowUp className='w-2'/></button>
                  <button onClick={() => minusOne(item.bookId)}><ArrowDown className='w-2'/></button>
                </div>
              </div>
              <div className='mx-1 w-[6rem]'>&ensp;x&ensp;<span className='font-bold'>{item.price} $</span></div>
              <button
                className='relative inline-block mx-1 p-2 bg-[#408697] text-[#f6f6f6] font-medium text-xs leading-tight uppercase rounded shadow-md hover:text-[#408697] hover:bg-[#f6f6f6]/10 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
                onClick={() => removeFromCart(item.bookId)}
              ><Bin className='w-3.5'/></button>
            </div>
          </div>
        );
      })}
      {cart.length === 0 ?
        <div className='text-xs font-semibold'>YOUR CART IS EMPTY</div> :
        <div className='flex flex-col justify-center items-center mt-6'>
          <div className='font-bold'>total: {total} $</div>
          <Btn onclick={() => makeOrder()} label='order' icon={undefined} />
        </div>}
    </div>
  );
};
