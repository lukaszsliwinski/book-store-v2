import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { IBookData } from './types';

export default function BookDetails() {
  const [bookData, setBookData] = useState<IBookData>();
  const [coverUrl, setCoverUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const params = useParams();

  useEffect(() => {
    const axiosBookDetailsConf = {
      method: 'post',
      url: '/book-details',
      data: {
        id: params.id
      }
    };

    axios(axiosBookDetailsConf)
      .then((result) => {
        if (result.data.message === 'book not found') {
          setErrorMessage(result.data.message);
        } else {
          setErrorMessage('');
          setBookData(result.data);

          if (result.data.coverUrl === 'no-cover.png') {
            setCoverUrl('../no-cover.png');
          } else {
            setCoverUrl(result.data.coverUrl);
          };
        };
      })
      .catch((err) => {
        err = new Error();
        console.log('404')
      });




  }, []);


  return (
    <>
      {bookData ?
      <div>
        <div>Title: {bookData.title}</div>
        <div>Authors: {bookData.authors}</div>
        <div><img src={coverUrl} height="150" alt="book cover"/></div>
        <div>Description: {bookData.description}</div>
        <div>Price: {bookData.price} $</div>
        <div>Publisher: {bookData.publisher}</div>
        <div>Published date: {bookData.publishedDate}</div>
      </div> :
      <div>{errorMessage}</div>}
    </>
  );
};
