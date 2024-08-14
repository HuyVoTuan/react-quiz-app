import styled from '@emotion/styled';

// MUI Components
import { Button } from '@mui/material';

// Styled Components
const AnswerButton = styled(Button)`
  margin: 0.5rem 0;
  width: 100%;
`;

const AnswerPage = () => {
  return (
    <>
      <p>Lorem ipsum dolor sit amet consectetur.</p>
      <AnswerButton variant="contained">Answer 1</AnswerButton>
      <AnswerButton variant="contained">Answer 2</AnswerButton>
      <AnswerButton variant="contained">Answer 3</AnswerButton>
      <AnswerButton variant="contained">Answer 4</AnswerButton>

      <span className="mt-4 block">Score: 0 / total</span>
    </>
  );
};

export default AnswerPage;
