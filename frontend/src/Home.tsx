import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const axiosConfig = {
      method: 'get',
      url: '/home'
    };

    axios(axiosConfig)
      .then((result) => setMessage(result.data.message))
      .catch((err) => {
        err = new Error();
      });
  }, []);

  return (
    <div>
      <h4>{message}</h4>
    </div>
  )
}
