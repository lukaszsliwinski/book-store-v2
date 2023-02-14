import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';
import { alertActions } from '../store/alertSlice';
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

  // call search function on render if there are search params
  useEffect(() => {
    search();
  }, [])

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
    };
  };

  // search book post request
  const search = () => {
    setNoResults(true);
    if (query === '') setBookList([]);
    if (searchInput.current && searchInput.current.value === query && query !== '') {
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
    };
  };

  return (
    <div className='flex flex-col items-center bg-custom-white dark:bg-custom-gray'>
      <div className='flex justify-center'>
        <div className='relative my-3 xl:w-[32rem]'>
          <input
            ref={searchInput}
            type='text'
            value={query}
            className='form-control block w-full pl-6 pr-36 py-3 text-lg font-normal text-custom-black dark:text-custom-white bg-white dark:bg-white/10 bg-clip-padding border-2 border-solid border-transparent rounded-sm transition ease-in-out m-0 focus:ring-0 focus:border-custom-main focus:outline-none'
            onChange={(event) => handleChange(event)}
            onKeyDown={(event) => handleEnter(event)}
            placeholder='Title, authors, ...'
          />
          <div className='absolute top-[11px] right-2'>
            <Btn onclick={() => search()} label='search' icon={<SearchIcon className='ml-2 w-3'/>} />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-6 mb-6'>
        {loader ?
          <Loader /> :
          bookList.length === 0 ?
            noResults && query !== '' ?
              <div className='col-span-3 mt-4 text-center font-semibold text-custom-black dark:text-custom-white'>NO RESULTS</div> :
              <></> :
            bookList.map(book => <BookOnTheList data={book} />)
        }
      </div>
    </div>
  );
};
