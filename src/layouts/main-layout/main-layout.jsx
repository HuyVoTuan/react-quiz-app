import PropTypes from 'prop-types';

// Components
import Header from '../../components/header';
import { Box, Container } from '@mui/material';

const MainLayout = ({ children, title }) => {
  return (
    <>
      <Container maxWidth="sm">
        <Box>
          <Header title={title} />
          <main>{children}</main>
        </Box>
      </Container>
    </>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};
