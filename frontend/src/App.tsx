import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './assets/global.css';
import 'tw-elements';

import Header from './layouts/Header';
import Search from './layouts/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './context/ProtectedRoute';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import Alert from './components/Alert';
import { IRootState } from './store';
import { alertActions } from './store/alertSlice';
import { badgeActions } from './store/badgeSlice';
import { authActions } from './store/authSlice';
import { getToken } from './utils/appUtils';

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
  const setLogged = (value: boolean) => dispatch(authActions.setLogged(value));
  const setUsername = (value: string) => dispatch(authActions.setUsername(value));

  // ref to html element
  const html = document.documentElement;

  // handle dark mode switch and add class to html element
  useEffect(() => {
    darkMode ? html.classList.add('dark') : html.classList.remove('dark');
  }, [darkMode, html.classList]);

  // get authorization data
  useEffect(() => {
    if (logged) {
      const token = getToken();

      if (!token) {
        setLogged(false);
      } else {
        const axiosGetUserConfig = {
          method: 'get',
          url: '/api/get-user',
          headers: {
            Authorization: `Bearer ${token}`
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
        });
      }
    }
  }, []);

  return (
    <div className="min-h-screen-mobile bg-neutral-50 pt-12 pb-20 leading-snug tracking-wider dark:bg-zinc-900">
      <Header />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute component={<Profile />} />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/cart" element={<ProtectedRoute component={<Cart />} />} />
      </Routes>
      <Alert />
    </div>
  );
}
