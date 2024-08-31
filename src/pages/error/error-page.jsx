import PropTypes from 'prop-types';

// MUI Components
import { Container, Typography, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Components
import BaseButton from '../../components/base-button';

const ErrorPage = ({ onReset }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main' }} />
      </Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Oops! Something Went Wrong
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        We couldn&apos;t proccess the page you&apos;re looking for. Please try
        again or go back to the homepage.
      </Typography>
      <BaseButton text="Go Back" naviagateDestination={'/'} action={onReset} />
    </Container>
  );
};

export default ErrorPage;

ErrorPage.propTypes = {
  onReset: PropTypes.func,
};
