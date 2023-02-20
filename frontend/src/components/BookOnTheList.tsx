import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as ArrowUp } from '../assets/svg/arrowup.svg';
import { ReactComponent as ArrowDown } from '../assets/svg/arrowdown.svg';
import { alertActions } from '../store/alertSlice';
import Btn from './Btn';
import { IBookDetails, IBook } from '../types';
import { addToCart, handleChangeCounter, validateCounter } from '../utils';

export default function BookOnTheList({ data } : { data: IBookDetails }) {
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
    <div className='flex flex-col xs:flex-row max-w-xs xs:max-w-md rounded-sm p-4 mb-6 xl:mb-0 bg-white dark:bg-custom-black text-custom-black dark:text-custom-white shadow-md'>
      <img className='h-56 mx-auto xs:mx-0 object-cover xs:w-40' src={data.coverUrl} alt='book cover' />
      <div className='xs:ml-4 xs:mt-0 mt-2 flex flex-col items-center xs:items-start'>
        <a href={`/books/${data.bookId}`} className='text-center xs:text-left text-sm font-bold hover:underline'>{data.title}</a>
        <div className='flex mt-2 text-xs'>
          {data.authors.map((author, i) => <>{author}{i !== data.authors.length-1 ? ',' : ''}&nbsp;</>)}
        </div>
        <div className='my-4 text-xl font-bold text-custom-main'>{data.price} $</div>
        <div className='flex items-center'>
          <div className='flex items-center pr-2 text-custom-black dark:text-custom-white bg-custom-white dark:bg-white/10'>
            <input
              type='number'
              value={counter}
              className='font-medium text-lg w-8 pl-2 bg-transparent focus:ring-0 focus:outline-none'
              onChange={(event) => handleChangeCounter({ event, setCounter })}
              onBlur={() => validateCounter({ counter, setCounter })}
            />
            <div className='inline-flex flex-col ml-2'>
              <button onClick={() => {if (counter < 5) setCounter(counter + 1)}}><ArrowUp className='w-2 hover:text-custom-main'/></button>
              <button onClick={() => {if (counter > 1) setCounter(counter - 1)}}><ArrowDown className='w-2 hover:text-custom-main'/></button>
            </div>
          </div>
          <Btn onclick={() => {if (dataToCart) addToCart({ dataToCart, setShowAlert, setAlertMessage })}} label='buy' icon={undefined} />
        </div>
      </div>
    </div>
  );
};
