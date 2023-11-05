import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  // if user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // if user is logged in, render the children components
  return children;
}

export default ProtectedRoute;
