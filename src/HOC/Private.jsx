import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProfileAuth } from '../store/profile/selectors';

export const Private = ({ children }) => {
  const location = useLocation();
  const auth = useSelector(getProfileAuth);

  if (!auth) {
    return <Navigate to="/sign" state={{ from: location }} />;
  }

  return children;
};
