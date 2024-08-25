import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function AuthRoute({ children }) {
  const accessToken = window.localStorage.getItem('user_id');

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default AuthRoute;

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
