import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';

const cookies = new Cookies();

export default function App() {
  const [logged, setLogged] = useState(false);

  const token = cookies.get('TOKEN');

  useEffect(() => {
    if (token) setLogged(true);
  }, []);

  return (
    <>
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login logged={logged} setLogged={setLogged}/>} />
        <Route path="/register" element={<Register logged={logged} setLogged={setLogged} />} />
        <Route path="/profile" element={<ProtectedRoute component={<Profile />} />} />
      </Routes>
    </>
  );
}
