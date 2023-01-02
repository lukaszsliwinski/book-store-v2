import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function ProtectedRoute({ component }: { component: JSX.Element }) {
  const token = cookies.get('TOKEN');

  if (token) {
    return component;
  } else {
    return <Navigate to='/login' replace={true} />;
  };
};
