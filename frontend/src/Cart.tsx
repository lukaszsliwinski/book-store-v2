import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { ReactComponent as ArrowUp } from './assets/arrowup.svg';
import { ReactComponent as ArrowDown } from './assets/arrowdown.svg';
import { ReactComponent as Bin } from './assets/bin.svg';
import Btn from './Btn';
import { IBook } from './types';
import { alertActions } from './store/alertSlice';

export default function Cart({ token, setBadge }: { token: string, setBadge: React.Dispatch<React.SetStateAction<number>> }) {
  // state
  const [cart, setCart] = useState<IBook[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [total, setTotal] = useState<number>();

  // dispatch functions from alert slice
  const dispatch = useDispatch();
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));

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
        setAlertMessage(result.data.message);
        setShowAlert(true);
        setCart([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='block p-6 rounded-lg shadow-lg bg-white dark:bg-custom-black text-custom-black dark:text-custom-white mx-auto my-4 md:max-w-[600px]'>
      <h4 className='text-center font-bold text-custom-main'>SHOPPING CART</h4>
      {cart.map(item => {
        return (
          <div className='flex items-center justify-between my-2'>
            <div className='font-bold text-sm'>{item.title}</div>
            <div className='flex items-center'>
              <div className='flex items-center border mx-1 px-2 text-custom-black dark:bg-custom-white'>
                <div className='font-medium text-lg'>{item.amount}</div>
                <div className='inline-flex flex-col ml-2'>
                  <button onClick={() => plusOne(item.bookId)}><ArrowUp className='w-2 hover:text-custom-main'/></button>
                  <button onClick={() => minusOne(item.bookId)}><ArrowDown className='w-2 hover:text-custom-main'/></button>
                </div>
              </div>
              <div className='mx-1 w-[6rem]'>&ensp;x&ensp;<span className='font-bold'>{item.price} $</span></div>
              <button
                className='relative inline-block mx-1 p-2 bg-custom-main text-custom-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:text-custom-main hover:bg-custom-white/10 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
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
