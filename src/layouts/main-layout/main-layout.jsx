import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../../store/actions/dashboardActions';

// Components
import { Box, Container, AppBar, Toolbar, Typography } from '@mui/material';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    // Clear user_id from localStorage
    window.localStorage.removeItem('user_id');

    // Dispatch userLogout action
    dispatch(userLogout());

    // Navigate to login page
    navigate('/login');
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          marginBottom: '2rem',
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/">Quiz App</Link>
          </Typography>
          <Link
            to="/dashboard"
            style={{
              marginRight: '1rem',
            }}
          >
            Dashboard
          </Link>
          <Link to="/login" onClick={onLogoutHandler}>
            Logout
          </Link>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box>{children}</Box>
      </Container>
    </>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
