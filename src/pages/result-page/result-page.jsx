import { useLocation, useNavigate } from 'react-router-dom';

// MUI Components
import { Button } from '@mui/material';

// Components
import Main from '../../components/main';
import Header from '../../components/header';

const ResultPage = () => {
  // React router
  const location = useLocation();
  const navigate = useNavigate();
  const { points } = location.state || {};

  return (
    <>
      <Header title={`Result`} />
      <Main>
        <h1 className="text-4xl font-bold">Final Score: {points}</h1>
        <Button
          variant="outlined"
          sx={{
            marginTop: '1rem',
          }}
          onClick={() => navigate('/')}
        >
          Back to home
        </Button>
      </Main>
    </>
  );
};

export default ResultPage;
