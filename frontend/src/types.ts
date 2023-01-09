export interface ILoggedState {
  logged: boolean,
  setLogged: (logged: boolean) => void
};

export interface IBookData {
  id: string,
  title: string,
  authors: Array<string>,
  description: string,
  publisher: string,
  publishedDate: string,
  price: number,
  coverUrl: string
};

export interface IBookInCart {
  title: string,
  authors: Array<string>,
  price: number,
  amount: number
}
