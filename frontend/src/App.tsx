import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Register from './Register';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
