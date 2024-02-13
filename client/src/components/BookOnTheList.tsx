import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as ArrowUp } from '../assets/svg/arrowup.svg';
import { ReactComponent as ArrowDown } from '../assets/svg/arrowdown.svg';
import { IRootState } from '../store';
import { alertActions } from '../store/alertSlice';
import { badgeActions } from '../store/badgeSlice';
import Btn from './Btn';
import { IBookDetails, IBook } from '../types';
import { addToCart, handleChangeCounter, validateCounter } from '../utils/appUtils';

export default function BookOnTheList({ data }: { data: IBookDetails }) {
  // local state
  const [dataToCart, setDataToCart] = useState<IBook>();
  const [counter, setCounter] = useState(1);

  // global state
  const logged = useSelector((state: IRootState) => state.auth.logged);

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));
  const setBadge = (value: number) => dispatch(badgeActions.setBadge(value));

  // update data to cart after every change of amount
  useEffect(() => {
    setDataToCart({
      bookId: data.bookId,
      title: data.title,
      authors: data.authors,
      price: data.price,
      amount: counter
    });

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setBadge(cart.length);
  }, [counter]);

  return (
    <div className="xs:flex-row xs:max-w-2xl text-zinc-950 mb-4 flex max-w-xs flex-col border-b border-teal-700 p-4 dark:text-neutral-50">
      <img
        className="xs:mx-0 xs:w-40 mx-auto h-56 object-cover"
        src={data.coverUrl}
        alt="book cover"
      />
      <div className="xs:ml-4 xs:mt-0 xs:items-start mt-2 flex flex-col items-center">
        <Link
          to={`/books/${data.bookId}`}
          className="xs:text-left xs:text-2xl text-center text-lg font-bold hover:underline"
        >
          {data.title}
        </Link>
        <div className="mt-2 text-xs">
          {data.authors.map((author, i) => (
            <span key={i}>
              {author}
              {i !== data.authors.length - 1 ? ',' : ''}&nbsp;
            </span>
          ))}
        </div>
        <div className="my-4 text-xl font-bold text-teal-700">{data.price} $</div>
        {logged ? (
          <div className="mt-auto flex items-center">
            <div className="text-zinc-950 flex items-center bg-neutral-50 pr-2 dark:bg-white/10 dark:text-neutral-50">
              <input
                type="number"
                value={counter}
                className="w-8 bg-transparent pl-2 text-lg font-medium focus:outline-none focus:ring-0"
                onChange={(event) => handleChangeCounter({ event, setCounter })}
                onBlur={() => validateCounter({ counter, setCounter })}
              />
              <div className="ml-2 inline-flex flex-col">
                <button
                  onClick={() => {
                    if (counter < 5) setCounter(counter + 1);
                  }}
                >
                  <ArrowUp className="w-2 hover:text-teal-700" />
                </button>
                <button
                  onClick={() => {
                    if (counter > 1) setCounter(counter - 1);
                  }}
                >
                  <ArrowDown className="w-2 hover:text-teal-700" />
                </button>
              </div>
            </div>
            <Btn
              onclick={() => {
                if (dataToCart) addToCart({ dataToCart, setShowAlert, setAlertMessage });
              }}
              label="buy"
              icon={undefined}
            />
          </div>
        ) : (
          <div className="xs:text-left mt-auto text-center text-xs font-semibold text-red-700">
            You must be logged in to buy a book!
          </div>
        )}
      </div>
    </div>
  );
}
