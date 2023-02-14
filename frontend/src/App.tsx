import { useEffect } from 'react';
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
import { alertActions } from './store/alertSlice';
import { badgeActions } from './store/badgeSlice';
import { authActions } from './store/authSlice';
import { getToken } from './utils';

export default function App() {
  // global state
  const darkMode = useSelector((state: IRootState) => state.mode.darkMode);
  const logged = useSelector((state: IRootState) => state.auth.logged);

  // dispatch functions from slices
  const dispatch = useDispatch();
  const setError = (value: boolean) => dispatch(alertActions.setError(value));
  const setAlertMessage = (value: string) => dispatch(alertActions.setAlertMessage(value));
  const setShowAlert = (value: boolean) => dispatch(alertActions.setShowAlert(value));
  const setBadge = (value: boolean) => dispatch(badgeActions.setBadge(value));
  const setUsername = (value: string) => dispatch(authActions.setUsername(value));

  // ref to html element
  const html = document.documentElement;

  // handle dark mode switch and add class to html element
  useEffect(() => {
    darkMode ? html.classList.add('dark') : html.classList.remove('dark');
  }, [darkMode, html.classList]);

  useEffect(() => {
    if (logged) {
      const token = getToken();

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
        .catch(() => {
          setError(true);
          setAlertMessage('Authentication error - please try again later!');
          setShowAlert(true);
        });

      window.addEventListener('storage', () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setBadge(cart.length);
      })
    };
  }, []);

  return (
    <div className='h-screen-mobile pt-12 bg-custom-white dark:bg-custom-gray'>
      <Header />
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<ProtectedRoute component={<Profile />} />} />
        <Route path='/books/:id' element={<BookDetails />} />
        <Route path='/cart' element={<ProtectedRoute component={<Cart />} />} />
      </Routes>
      <Alert />
    </div>
  );
};
