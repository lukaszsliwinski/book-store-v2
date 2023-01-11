import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';
import BookDetails from './BookDetails';
import Cart from './Cart';

const cookies = new Cookies();

export default function App() {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [badge, setBadge] = useState(JSON.parse(localStorage.getItem('cart') || '[]').length);

  const token = cookies.get('TOKEN');

  useEffect(() => {
    if (token) {
      setLogged(true);

      const axiosGetUserConf = {
        method: 'get',
        url: '/get-user',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };

      axios(axiosGetUserConf)
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

  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <>
      <nav>
        <a href="/">home</a>
        {!logged ? (
          <>
            <a href="/login">login</a>
            <a href="/register">create an account</a>
          </>
        ) : (
          <>
            <span>logged as {username}</span>
            <button onClick={() => logout()}>logout</button>
            <a href="/cart">cart -{badge}-</a>
          </>

        )}
        <a href="/profile">profile</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login logged={logged} setLogged={setLogged} />} />
        <Route path="/register" element={<Register logged={logged} setLogged={setLogged} />} />
        <Route path="/profile" element={<ProtectedRoute component={<Profile token={token}/>} />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/cart" element={<ProtectedRoute component={<Cart token={token} setBadge={setBadge}/>} />} />
      </Routes>
    </>
  );
}
