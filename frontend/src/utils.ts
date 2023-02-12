import Cookies from 'universal-cookie';

import { IBook } from './types';

const cookies = new Cookies();

export const addToCart = (dataToCart: IBook) => {
  const token = cookies.get('TOKEN');

  if (token) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const book = cart.find((item: IBook) => item.bookId === dataToCart.bookId)
    if (book && book.amount < 5) {
      book.amount += dataToCart.amount;
      if (book.amount > 5) book.amount = 5;
      cart.map((item: IBook) => {
        return (item.bookId === book.bookId) ? book : item;
      });
    } else if (!book) {
      cart.push(dataToCart);
    };
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  } else {
    window.location.href = '/login';
  };
};


export const handleChangeCounter = ({ event, setCounter }: {
  event: React.ChangeEvent<HTMLInputElement>,
  setCounter: (counter: number) => void
}) => {
  event.preventDefault();
  setCounter(event.target.valueAsNumber);
};


export const validateCounter = ({ counter, setCounter }: {
  counter: number,
  setCounter: (counter: number) => void
}) => {
  if (counter > 5) {
    setCounter(5);
  } else if (counter < 1) {
    setCounter(1);
  };
};
