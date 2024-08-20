import { Outlet } from 'react-router-dom';

// Components
import { Box, Container } from '@mui/material';

const MainLayout = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Box>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default MainLayout;
