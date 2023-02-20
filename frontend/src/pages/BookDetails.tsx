import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { ReactComponent as ArrowUp } from '../assets/svg/arrowup.svg';
import { ReactComponent as ArrowDown } from '../assets/svg/arrowdown.svg';
import { alertActions } from '../store/alertSlice';
import Btn from '../components/Btn';
import { IBookDetails, IBook } from '../types';
import { addToCart, handleChangeCounter, validateCounter } from '../utils';

export default function BookDetails() {
  // local state
  const [bookData, setBookData] = useState<IBookDetails>();
  const [coverUrl, setCoverUrl] = useState('');
  const [dataToCart, setDataToCart] = useState<IBook>();
  const [counter, setCounter] = useState(1);

  const params = useParams();

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setError = (value: boolean) => dispatch(alertActions.setError(value));
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));

  // get book details from API
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
        if (result.data.message !== 'book not found') {
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

    // update data to cart after every change of amount
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
    <div className='flex justify-center mt-4'>
      {bookData ?
      <div className='flex flex-col sm:flex-row max-w-4xl rounded-sm p-4 mx-4 bg-white dark:bg-custom-black text-custom-black dark:text-custom-white shadow-md'>
        <img className='sm:h-96 xs:h-80 h-64 sm:ml-12 m-auto object-cover' src={coverUrl} alt='book cover' />
        <div className='mr-0 sm:mr-3 p-1 sm:p-8 flex flex-col items-center sm:items-start'>
          <h5 className='text-center sm:text-left text-sm font-bold hover:underline mt-2'>{bookData.title}</h5>
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
      <div className='flex justify-cente px-16 py-6 w-fit rounded-sm bg-white dark:bg-custom-black text-custom-black dark:text-custom-white shadow-md'>
        Book not found - go back to&nbsp;<a href='/' className='font-bold underline underline-offset-2 hover:text-custom-main'>main page</a>
      </div>}
    </div>
  );
};
