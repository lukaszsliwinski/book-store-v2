export interface ILoggedState {
  logged: boolean,
  setLogged: (logged: boolean) => void
};

export interface IBookData {
  id: string,
  title: string,
  authors: [],
  description: string,
  publisher: string,
  publishedDate: string,
  price: number,
  imgSrc: string
};
