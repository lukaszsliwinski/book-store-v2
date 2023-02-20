import Cookies from 'universal-cookie';

import { IBook } from './types';

// get user auth token from cookies
export const getToken = () => {
  const cookies = new Cookies();
  return cookies.get('TOKEN');
};

// check if user is logged in and add book to cart
export const addToCart = ({
  dataToCart,
  setShowAlert,
  setAlertMessage
}: {
  dataToCart: IBook;
  setShowAlert: (value: boolean) => void;
  setAlertMessage: (value: string) => void;
}) => {
  const token = getToken();

  if (token) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const book = cart.find((item: IBook) => item.bookId === dataToCart.bookId);

    if (book && book.amount < 5) {
      book.amount += dataToCart.amount;
      if (book.amount > 5) {
        book.amount = 5;
        setAlertMessage('You can add to cart only 5 of the same books!');
      } else {
        setAlertMessage('Book added to cart!');
      }
      setShowAlert(true);

      cart.map((item: IBook) => {
        return item.bookId === book.bookId ? book : item;
      });
    } else if (book && book.amount >= 5) {
      setAlertMessage('You can add to cart only 5 of the same books!');
      setShowAlert(true);
    } else if (!book) {
      cart.push(dataToCart);
      setAlertMessage('Book added to cart!');
      setShowAlert(true);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
  } else {
    window.location.href = '/login';
  }
};

// handle change amount of books in input field
export const handleChangeCounter = ({
  event,
  setCounter
}: {
  event: React.ChangeEvent<HTMLInputElement>;
  setCounter: (counter: number) => void;
}) => {
  event.preventDefault();
  setCounter(event.target.valueAsNumber);
};

// validate amount of books in input field (1-5)
export const validateCounter = ({
  counter,
  setCounter
}: {
  counter: number;
  setCounter: (counter: number) => void;
}) => {
  if (counter > 5) {
    setCounter(5);
  } else if (counter < 1) {
    setCounter(1);
  }
};
