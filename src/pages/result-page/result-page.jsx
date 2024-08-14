// MUI Components
import { Button } from '@mui/material';

const ResultPage = () => {
  return (
    <>
      <h1 className="text-4xl font-bold">Final Score 0</h1>
      <Button
        variant="outlined"
        sx={{
          marginTop: '1rem',
        }}
      >
        Back to home
      </Button>
    </>
  );
};

export default ResultPage;
