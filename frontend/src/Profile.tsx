import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Profile() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  const token = cookies.get('TOKEN');

  useEffect(() => {
    const axiosProfileConf = {
      method: 'get',
      url: '/profile',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    axios(axiosProfileConf)
      .then((result) => {
        setMessage(result.data.message)
        setUser(result.data.username)
      })
      .catch((err) => {
        err = new Error();
      });
  }, []);

  return (
    <div>
      <h4>{message} / logged in as {user}</h4>
    </div>
  );
};
