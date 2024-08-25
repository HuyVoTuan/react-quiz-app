import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function GuestRoute({ children }) {
  const accessToken = window.localStorage.getItem('user_id');

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default GuestRoute;

GuestRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
