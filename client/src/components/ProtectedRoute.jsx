import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../services/auth';

function ProtectedRoute({ children }) {
  const location = useLocation();

  // If the user is not authenticated, redirect to home
  if (!isLoggedIn()) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // User is authenticated
  return children;
}

export default ProtectedRoute;
