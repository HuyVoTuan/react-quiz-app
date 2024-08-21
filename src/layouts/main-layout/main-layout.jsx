import { Link, Outlet } from 'react-router-dom';

// Components
import { Box, Container, AppBar, Toolbar, Typography } from '@mui/material';

const MainLayout = ({ children }) => {
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
          <Link to="/dashboard">Dashboard</Link>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box>
          {children}
        </Box>
      </Container>
    </>
  );
};

export default MainLayout;
