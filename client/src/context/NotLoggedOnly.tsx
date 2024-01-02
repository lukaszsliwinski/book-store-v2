import { Navigate } from 'react-router-dom';

import { getToken } from '../utils/appUtils';

export default function NotLoggedOnly({ component }: { component: JSX.Element }) {
  const token = getToken();

  if (!token) {
    return component;
  } else {
    return <Navigate to="/profile" replace={true} />;
  }
}
