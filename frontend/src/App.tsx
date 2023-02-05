import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
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

const cookies = new Cookies();

export default function App() {
  // state
  const [darkMode, setDarkMode] = useState(false);
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [badge, setBadge] = useState(JSON.parse(localStorage.getItem('cart') || '[]').length);

  const token = cookies.get('TOKEN');

  // ref to html element
  const html = document.documentElement;

  // handle dark mode switch and add class to html element
  useEffect(() => {
    darkMode ? html.classList.add('dark') : html.classList.remove('dark');
    console.log('darkMode state:', darkMode);
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
    <div className='h-screen-mobile bg-custom-white dark:bg-custom-gray'>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} logged={logged} username={username} badge={badge}/>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/login" element={<Login logged={logged} setLogged={setLogged} />} />
        <Route path="/register" element={<Register logged={logged} setLogged={setLogged} />} />
        <Route path="/profile" element={<ProtectedRoute component={<Profile token={token} username={username} />} />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/cart" element={<ProtectedRoute component={<Cart token={token} setBadge={setBadge} />} />} />
      </Routes>
    </div>
  );
}
