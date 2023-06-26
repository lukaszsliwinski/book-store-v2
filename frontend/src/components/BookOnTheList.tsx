import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as ArrowUp } from '../assets/svg/arrowup.svg';
import { ReactComponent as ArrowDown } from '../assets/svg/arrowdown.svg';
import { alertActions } from '../store/alertSlice';
import Btn from './Btn';
import { IBookDetails, IBook } from '../types';
import { addToCart, handleChangeCounter, validateCounter } from '../utils';

export default function BookOnTheList({ data }: { data: IBookDetails }) {
  // local state
  const [dataToCart, setDataToCart] = useState<IBook>();
  const [counter, setCounter] = useState(1);

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));

  // update data to cart after every change of amount
  useEffect(() => {
    setDataToCart({
      bookId: data.bookId,
      title: data.title,
      authors: data.authors,
      price: data.price,
      amount: counter
    });
  }, [counter]);

  return (
    <div className="xs:flex-row xs:max-w-md dark:bg-zinc-950 text-zinc-950 dark:shadow-dark mb-6 flex max-w-xs flex-col rounded-sm bg-white p-4 shadow-md dark:text-neutral-50 xl:mb-0">
      <img
        className="xs:mx-0 xs:w-40 mx-auto h-56 object-cover"
        src={data.coverUrl}
        alt="book cover"
      />
      <div className="xs:ml-4 xs:mt-0 xs:items-start mt-2 flex flex-col items-center">
        <Link
          to={`/books/${data.bookId}`}
          className="xs:text-left text-center text-sm font-bold hover:underline"
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
        <div className="flex items-center">
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
      </div>
    </div>
  );
}
