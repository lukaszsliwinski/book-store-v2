import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './assets/global.css';
import 'tw-elements';

import Header from './Header';
import Search from './Search';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';
import BookDetails from './BookDetails';
import Cart from './Cart';
import Alert from './Alert';
import { IRootState } from './store';
import { badgeActions } from './store/badgeSlice';
import { getToken } from './utils';

export default function App() {
  // local state
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState('');

  // global state
  const darkMode = useSelector((state: IRootState) => state.mode.darkMode);

  const token = getToken();

  // dispatch function from alert slice
  const dispatch = useDispatch();
  const setBadge = (value: boolean) => dispatch(badgeActions.setBadge(value));

  // ref to html element
  const html = document.documentElement;

  // handle dark mode switch and add class to html element
  useEffect(() => {
    darkMode ? html.classList.add('dark') : html.classList.remove('dark');
  }, [darkMode, html.classList]);

  useEffect(() => {
    if (token) {
      setLogged(true);

      const axiosGetUserConfig = {
        method: 'get',
        url: '/api/get-user',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };

      axios(axiosGetUserConfig)
        .then((result) => {
          setUsername(result.data.user.username);
        })
        .catch((error) => {
          error = new Error();
        });

      window.addEventListener('storage', () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setBadge(cart.length);
      })
    };
  }, []);

  return (
    <div className='h-screen-mobile pt-12 bg-custom-white dark:bg-custom-gray'>
      <Header logged={logged} username={username} />
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/login' element={<Login logged={logged} setLogged={setLogged} />} />
        <Route path='/register' element={<Register logged={logged} setLogged={setLogged} />} />
        <Route path='/profile' element={<ProtectedRoute component={<Profile username={username} />} />} />
        <Route path='/books/:id' element={<BookDetails />} />
        <Route path='/cart' element={<ProtectedRoute component={<Cart />} />} />
      </Routes>
      <Alert />
    </div>
  );
}
