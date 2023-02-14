import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { ReactComponent as ArrowUp } from './assets/arrowup.svg';
import { ReactComponent as ArrowDown } from './assets/arrowdown.svg';
import Btn from './Btn';
import { alertActions } from './store/alertSlice';
import { IBookDetails, IBook } from './types';
import { addToCart, handleChangeCounter, validateCounter } from './utils';

export default function BookDetails() {
  // local state
  const [bookData, setBookData] = useState<IBookDetails>();
  const [coverUrl, setCoverUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dataToCart, setDataToCart] = useState<IBook>();
  const [counter, setCounter] = useState(1);

  const params = useParams();

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setError = (value: boolean) => dispatch(alertActions.setError(value));
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));

  useEffect(() => {
    const axiosBookDetailsConfig = {
      method: 'post',
      url: '/api/book-details',
      data: {
        id: params.id
      }
    };

    axios(axiosBookDetailsConfig)
      .then((result) => {
        if (result.data.message === 'Book not found!') {
          setError(true);
          setAlertMessage(result.data.message);
          setShowAlert(true);
        } else {
          setErrorMessage('');
          setBookData(result.data);
          setCoverUrl(`${result.data.coverUrl === 'no-cover.png' ? '../no-cover.png' : result.data.coverUrl}`)
          setDataToCart({
            bookId: result.data.bookId,
            title: result.data.title,
            authors: result.data.authors,
            price: result.data.price,
            amount: counter
          });
        };
      })
      .catch(() => {
        setError(true);
        setAlertMessage('Database connection error - please try again later!');
        setShowAlert(true);
      });
  }, []);

  useEffect(() => {
    if (dataToCart) {
      setDataToCart({
        bookId: dataToCart.bookId,
        title: dataToCart.title,
        authors: dataToCart.authors,
        price: dataToCart.price,
        amount: counter
      });
    };
  }, [counter]);

  return (
    <>
      {bookData ?
      <div className='flex flex-col md:flex-row mx-auto my-4 md:w-3/4 rounded-lg bg-white dark:bg-custom-black text-custom-black dark:text-custom-white shadow-lg'>
        <img className='h-96 md:ml-12 md:my-4 rounded-t-lg md:rounded-none' src={coverUrl} alt='book cover' />
        <div className='p-8 flex flex-col justify-start'>
          <h5 className='text-sm font-bold hover:underline'>{bookData.title}</h5>
          <div className='flex text-xs mb-2'>
            {bookData.authors.map((author, i) => <span>{author}{i !== bookData.authors.length-1 ? ',' : ''}&nbsp;</span>)}
          </div>
          <div className='flex text-xs mb-2 text-justify'>{bookData.description.replace(/<\/?[^>]+(>|$)/g, ' ')}</div>
          <div className='flex text-xs mb-2'><span className='font-semibold'>publisher:</span>&nbsp;{bookData.publisher}</div>
          <div className='flex text-xs'><span className='font-semibold'>published date:</span>&nbsp;{bookData.publishedDate}</div>
          <div className='my-4 text-xl font-bold text-custom-main'>{bookData.price} $</div>
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
      </div> :
      <div>{errorMessage}</div>}
    </>
  );
};
