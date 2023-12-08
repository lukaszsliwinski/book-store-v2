import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';
import axios from 'axios';

import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';
import { alertActions } from '../store/alertSlice';
import Aside from '../components/Aside';
import Btn from '../components/Btn';
import Loader from '../components/Loader';
import BookOnTheList from '../components/BookOnTheList';

export default function Search() {
  // search params
  const [searchParams, setSearchParams] = useSearchParams();

  // local state
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [bookList, setBookList] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setError = (value: boolean) => dispatch(alertActions.setError(value));
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));

  // input ref
  const searchInput = useRef<HTMLInputElement>(null);

  // get screen size
  const { width } = useWindowSize();

  // call search function on render if there are search params
  useEffect(() => {
    search();
  }, []);

  // handle input change and set state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoResults(false);
    event.preventDefault();
    setQuery(event.target.value);
  };

  // handle enter press
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      search();
    }
  };

  // search book post request
  const search = () => {
    setNoResults(true);
    if (query === '') {
      setBookList([]);
      setSearchParams('');
    } else if (searchInput.current && searchInput.current.value === query) {
      setSearchParams({ query });
      const axiosSearchConfig = {
        url: '/api/search',
        data: {
          query: query
        }
      };

      setLoader(true);

      axios
        .post(axiosSearchConfig.url, axiosSearchConfig.data)
        .then((result) => {
          const data = result.data.response;
          data.length !== 0 ? setBookList(data) : setBookList([]);
        })
        .catch(() => {
          setError(true);
          setAlertMessage('Server connection error - please try again later!');
          setShowAlert(true);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  return (
    <>
      <Aside />
      <div className="ml-12 mr-2 flex flex-col items-center">
        <div className="flex justify-center">
          <div className="relative my-3 md:max-w-[32rem]">
            <input
              ref={searchInput}
              type="text"
              role="input"
              name="search"
              value={query}
              className="form-control xs:pl-6 xs:pr-36 xs:py-3 xs:text-lg text-zinc-950 block w-full rounded-sm border-2 border-solid border-transparent bg-white bg-clip-padding p-2 pr-8 text-base font-normal transition ease-in-out focus:border-teal-700 focus:outline-none focus:ring-0 dark:bg-white/10 dark:text-neutral-50"
              onChange={(event) => handleChange(event)}
              onKeyDown={(event) => handleEnter(event)}
              placeholder="Title, authors, ..."
            />
            <div className="absolute top-[11px] right-2">
              {width < 480 ? (
                <button onClick={() => search()}>
                  <SearchIcon className="m-1 w-4 text-[#9ca3af]" />
                </button>
              ) : (
                <Btn
                  onclick={() => search()}
                  label="search"
                  icon={<SearchIcon className="ml-2 w-3" />}
                />
              )}
            </div>
          </div>
        </div>
        <div className="mb-6 grid">
          {loader ? (
            <Loader />
          ) : bookList.length === 0 ? (
            noResults &&
            query !== '' && (
              <div className="text-zinc-950 col-span-3 mt-4 text-center font-semibold dark:text-neutral-50">
                no results
              </div>
            )
          ) : (
            bookList.map((book, i) => <BookOnTheList key={i} data={book} />)
          )}
        </div>
      </div>
    </>
  );
}
