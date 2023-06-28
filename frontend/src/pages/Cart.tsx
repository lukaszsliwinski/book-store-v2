import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { ReactComponent as ArrowUp } from '../assets/svg/arrowup.svg';
import { ReactComponent as ArrowDown } from '../assets/svg/arrowdown.svg';
import { ReactComponent as Bin } from '../assets/svg/bin.svg';
import { alertActions } from '../store/alertSlice';
import { badgeActions } from '../store/badgeSlice';
import Btn from '../components/Btn';
import { IBook } from '../types';
import { getToken } from '../utils/appUtils';

export default function Cart() {
  // local state
  const [cart, setCart] = useState<IBook[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [total, setTotal] = useState<number>();

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setError = (value: boolean) => dispatch(alertActions.setError(value));
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));
  const setBadge = (value: number) => dispatch(badgeActions.setBadge(value));

  // update cart and total price
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setBadge(cart.length);

    if (cart.length !== 0) {
      let sum = 0;
      cart.forEach((item: IBook) => {
        sum += item.price * item.amount;
      });

      // round sum to 2 decimals and set total state
      sum = Math.round(sum * 100) / 100;
      setTotal(sum);
    }
  }, [cart]);

  // subtract one book and delete if it is the last one
  const minusOne = (bookId: string) => {
    const newCart = [...cart];
    const book: IBook = newCart.find((item: IBook) => item.bookId === bookId) as IBook;
    if (book.amount > 1) {
      book.amount -= 1;
      newCart.map((item: IBook) => {
        return item.bookId === book.bookId ? book : item;
      });
    } else {
      for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].bookId === bookId) newCart.splice(i, 1);
      }
    }
    setCart(newCart);
  };

  // add one book if less than five
  const plusOne = (bookId: string) => {
    const newCart = [...cart];
    const book: IBook = newCart.find((item: IBook) => item.bookId === bookId) as IBook;
    if (book.amount < 5) {
      book.amount += 1;
    }
    setCart(newCart);
  };

  // remove book from cart
  const removeFromCart = (bookId: string) => {
    const newCart = [...cart];
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].bookId === bookId) newCart.splice(i, 1);
    }
    setCart(newCart);
  };

  // make an order and save to database
  const makeOrder = () => {
    const token = getToken();

    const axiosMakeOrderConfig = {
      method: 'post',
      url: '/api/order',
      headers: {
        Authorization: `Bearer ${token}`
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
      .catch(() => {
        setError(true);
        setAlertMessage('Database connection error - please try again later!');
        setShowAlert(true);
      });
  };

  return (
    <div className="mt-4 flex justify-center">
      <div className="dark:bg-zinc-950 text-zinc-950 dark:shadow-dark mx-4 flex w-full max-w-4xl flex-col rounded-sm bg-white p-4 shadow-md dark:text-neutral-50 md:w-[768px]">
        <h4 className="text-center font-bold text-teal-700">SHOPPING CART</h4>
        {cart.map((item, i) => {
          return (
            <div key={i} className="xs:flex-row xs:items-center my-2 flex flex-col justify-between">
              <div className="text-sm font-bold">{item.title}</div>
              <div className="flex items-center justify-end">
                <div className="text-zinc-950 flex w-10 items-center pl-2 dark:text-neutral-50">
                  <div className="text-lg font-medium">{item.amount}</div>
                  <div className="ml-2 inline-flex flex-col">
                    <button onClick={() => plusOne(item.bookId)}>
                      <ArrowUp className="w-2 hover:text-teal-700" />
                    </button>
                    <button onClick={() => minusOne(item.bookId)}>
                      <ArrowDown className="w-2 hover:text-teal-700" />
                    </button>
                  </div>
                </div>
                <div className="mx-1 w-[6rem]">
                  &ensp;x&ensp;<span className="font-bold">{item.price} $</span>
                </div>
                <button
                  className="relative mx-1 inline-block rounded-sm bg-teal-700 p-2 text-xs font-medium uppercase leading-tight text-neutral-50 shadow-md transition duration-150 ease-in-out hover:bg-teal-800 focus:outline-none focus:ring-0"
                  onClick={() => removeFromCart(item.bookId)}
                >
                  <Bin className="w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
        {cart.length === 0 ? (
          <div className="text-xs font-semibold">Your cart is empty.</div>
        ) : (
          <div className="mt-6 flex flex-col items-center justify-center">
            <div className="font-bold">total: {total} $</div>
            <Btn onclick={() => makeOrder()} label="order" icon={undefined} />
          </div>
        )}
      </div>
    </div>
  );
}
