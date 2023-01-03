import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';

const cookies = new Cookies();

export default function App() {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState('');

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
          setUser(result.data.user.userName);
        })
        .catch((err) => {
          err = new Error();
        });
    };
  }, []);

  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
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
            <span>logged as {user}</span>
            <button onClick={() => logout()}>logout</button>
          </>

        )}
        <a href="/profile">profile</a>
      </nav>
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login logged={logged} setLogged={setLogged} />} />
        <Route path="/register" element={<Register logged={logged} setLogged={setLogged} />} />
        <Route path="/profile" element={<ProtectedRoute component={<Profile user={user}/>} />} />
      </Routes>
    </>
  );
}
