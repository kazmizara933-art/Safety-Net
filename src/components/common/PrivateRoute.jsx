import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login with return URL
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if route requires specific roles
  if (roles.length > 0 && !user?.roles?.some(role => roles.includes(role))) {
    // User doesn't have required role, redirect to home or unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has required role, render the children
  return children;
};

export default PrivateRoute;
