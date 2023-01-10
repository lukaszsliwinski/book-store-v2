import Cookies from 'universal-cookie';

import { IBookInCart } from './types';

const cookies = new Cookies();

export const addToCart = (dataToCart: IBookInCart) => {
  const token = cookies.get('TOKEN');

  if (token) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let book = cart.find((item: IBookInCart) => item.bookId === dataToCart.bookId)
    if (book && book.amount < 5) {
      book.amount += 1;
      cart.map((item: IBookInCart) => {
        return (item.bookId === book.bookId) ? book : item;
      });
    } else if (!book) {
      cart.push(dataToCart);
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  } else {
    window.location.href = '/login';
  };
};
