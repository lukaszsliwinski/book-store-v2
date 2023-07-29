import { Navigate } from 'react-router-dom';

import { getToken } from '../utils/appUtils';

export default function ProtectedRoute({ component }: { component: JSX.Element }) {
  const token = getToken();

  if (token) {
    return component;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
}
