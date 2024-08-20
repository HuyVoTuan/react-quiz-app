import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useEffect, useState, useMemo } from 'react';

// MUI Components
import Button from '@mui/material/Button';

// Styled Components
const StyledAnswerButton = styled(Button)`
  margin: 0.5rem 0;
  width: 100%;
`;

// Constants
const answerTimeouts = {
  hard: 20,
  medium: 30,
  easy: 60,
};

const AnswerButtons = ({ answers, state, dispatch, difficulty }) => {
  // Derive state
  const { points, questions } = state;

  // State hook
  const [timer, setTimer] = useState(answerTimeouts[difficulty]);

  // Effect hook for timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          dispatch({ type: 'ANSWER_QUESTION', payload: '' });
          return answerTimeouts[difficulty];
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [difficulty, dispatch, timer]);

  // Memoized answers
  const memoizedAnswers = useMemo(() => answers, [answers]);

  // Function to handle answer click
  const handleAnswerClick = (answer) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: answer });
    setTimer(answerTimeouts[difficulty]);
  };

  // Function to format timer
  const formatTimer = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  console.log(timer);

  return (
    <>
      {memoizedAnswers.map((answer) => (
        <StyledAnswerButton
          key={answer}
          variant="contained"
          color="primary"
          value={answer}
          onClick={() => handleAnswerClick(answer)}
        >
          <p dangerouslySetInnerHTML={{ __html: answer }} />
        </StyledAnswerButton>
      ))}
      <div className="flex w-full items-center justify-between">
        <span>
          Score: {points} / {questions.length}
        </span>
        <span
          className={`${timer < 10 ? 'animate-pulse-fast text-red-600' : ''}`}
        >
          Timer: {formatTimer(timer)}
        </span>
      </div>
    </>
  );
};

AnswerButtons.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnswerButtons;
