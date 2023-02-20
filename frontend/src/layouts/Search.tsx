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
        method: 'post',
        url: '/api/search',
        data: {
          query: query
        }
      };

      setLoader(true);

      axios(axiosSearchConfig)
        .then((result) => {
          const data = result.data.response;
          data.length !== 0 ? setBookList(data) : setBookList([]);
        })
        .catch(() => {
          setError(true);
          setAlertMessage('Database connection error - please try again later!');
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
      <div className="bg-custom-white dark:bg-custom-gray ml-12 mr-2 flex  flex-col items-center">
        <div className="flex justify-center">
          <div className="relative my-3 md:max-w-[32rem]">
            <input
              ref={searchInput}
              type="text"
              value={query}
              className="form-control xs:pl-6 xs:pr-36 xs:py-3 xs:text-lg text-custom-black dark:text-custom-white focus:border-custom-main block w-full rounded-sm border-2 border-solid border-transparent bg-white bg-clip-padding p-2 pr-8 text-base font-normal transition ease-in-out focus:outline-none focus:ring-0 dark:bg-white/10"
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
        <div className="mb-6 grid xl:grid-cols-2 xl:gap-6">
          {loader ? (
            <Loader />
          ) : bookList.length === 0 ? (
            noResults && query !== '' ? (
              <div className="text-custom-black dark:text-custom-white col-span-3 mt-4 text-center font-semibold">
                no results
              </div>
            ) : (
              <></>
            )
          ) : (
            bookList.map((book) => <BookOnTheList data={book} />)
          )}
        </div>
      </div>
    </>
  );
}
