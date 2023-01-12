export interface ILoggedState {
  logged: boolean,
  setLogged: (logged: boolean) => void
};

export interface IBookDetails {
  bookId: string,
  title: string,
  authors: Array<string>,
  description: string,
  publisher: string,
  publishedDate: string,
  price: number,
  coverUrl: string
};

export interface IBook {
  bookId: string,
  title: string,
  authors: Array<string>,
  price: number,
  amount: number
}
