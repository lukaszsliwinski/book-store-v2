import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { ReactComponent as ArrowUp } from '../assets/svg/arrowup.svg';
import { ReactComponent as ArrowDown } from '../assets/svg/arrowdown.svg';
import { alertActions } from '../store/alertSlice';
import Btn from '../components/Btn';
import Loader from '../components/Loader';
import { IBookDetails, IBook } from '../types';
import { addToCart, handleChangeCounter, validateCounter } from '../utils';

export default function BookDetails() {
  // local state
  const [bookData, setBookData] = useState<IBookDetails>();
  const [coverUrl, setCoverUrl] = useState('');
  const [dataToCart, setDataToCart] = useState<IBook>();
  const [counter, setCounter] = useState(1);
  const [loader, setLoader] = useState(false);

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

    setLoader(true);

    axios(axiosBookDetailsConfig)
      .then((result) => {
        if (result.data.message !== 'book not found') {
          setBookData(result.data);
          setCoverUrl(
            `${result.data.coverUrl === 'no-cover.png' ? '../no-cover.png' : result.data.coverUrl}`
          );
          setDataToCart({
            bookId: result.data.bookId,
            title: result.data.title,
            authors: result.data.authors,
            price: result.data.price,
            amount: counter
          });
        }
      })
      .catch(() => {
        setError(true);
        setAlertMessage('Database connection error - please try again later!');
        setShowAlert(true);
      })
      .finally(() => {
        setLoader(false);
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
    }
  }, [counter]);

  return (
    <div className="mt-4 flex justify-center">
      {loader ? (
        <Loader />
      ) : bookData ? (
        <div className="dark:bg-custom-black text-custom-black dark:text-custom-white mx-4 flex max-w-4xl flex-col rounded-sm bg-white p-4 shadow-md sm:flex-row">
          <img
            className="xs:h-80 m-auto h-64 object-cover sm:ml-12 sm:h-96"
            src={coverUrl}
            alt="book cover"
          />
          <div className="mr-0 flex flex-col items-center p-1 sm:mr-3 sm:items-start sm:p-8">
            <h5 className="mt-2 text-center text-sm font-bold hover:underline sm:text-left">
              {bookData.title}
            </h5>
            <div className="mb-2 flex text-xs">
              {bookData.authors.map((author, i) => (
                <span>
                  {author}
                  {i !== bookData.authors.length - 1 ? ',' : ''}&nbsp;
                </span>
              ))}
            </div>
            <div className="mb-2 flex text-justify text-xs">
              {bookData.description.replace(/<\/?[^>]+(>|$)/g, ' ')}
            </div>
            <div className="mb-2 w-full text-xs">
              <span className="font-semibold">publisher:</span>&nbsp;{bookData.publisher}
            </div>
            <div className="flex w-full text-xs">
              <span className="font-semibold">published date:</span>&nbsp;{bookData.publishedDate}
            </div>
            <div className="text-custom-main my-4 text-xl font-bold">{bookData.price} $</div>
            <div className="flex items-center">
              <div className="text-custom-black dark:text-custom-white bg-custom-white flex items-center pr-2 dark:bg-white/10">
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
                    <ArrowUp className="hover:text-custom-main w-2" />
                  </button>
                  <button
                    onClick={() => {
                      if (counter > 1) setCounter(counter - 1);
                    }}
                  >
                    <ArrowDown className="hover:text-custom-main w-2" />
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
      ) : (
        <div className="justify-cente dark:bg-custom-black text-custom-black dark:text-custom-white flex w-fit rounded-sm bg-white px-16 py-6 shadow-md">
          Book not found - go back to&nbsp;
          <a href="/" className="hover:text-custom-main font-bold underline underline-offset-2">
            main page
          </a>
        </div>
      )}
    </div>
  );
}
