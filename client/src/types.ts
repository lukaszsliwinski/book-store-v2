export interface IBookDetails {
  bookId: string;
  title: string;
  authors: Array<string>;
  description: string;
  publisher: string;
  publishedDate: string;
  price: number;
  coverUrl: string;
}

export interface IBook {
  bookId: string;
  title: string;
  authors: Array<string>;
  price: number;
  amount: number;
}

export interface IOrder {
  number: number;
  date: string;
  books: Array<IBook>;
  total: number;
}
