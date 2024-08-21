import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useEffect, useState, useCallback } from 'react';
import { useDashboard } from '../../../contexts/use-dashboard-context'; // Import the custom hook
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

const AnswerButtons = ({ state, dispatch, difficulty, answers }) => {
  // Custom hook
  const { dispatch: dashboardDispatch } = useDashboard();

  // State hook
  const [timer, setTimer] = useState(answerTimeouts[difficulty]);

  // Function to handle answer click
  const handleAnswerClick = useCallback(
    (answer) => {
      // Dispatch the answer question action
      dispatch({ type: 'ANSWER_QUESTION', payload: answer });
      // Update the dashboard with the answer log
      dashboardDispatch({
        type: 'SET_ANSWER_LOG',
        payload: {
          question: state?.questions[state?.questionIndex].question,
          answer,
          isCorrect:
            answer === state?.questions[state?.questionIndex].correct_answer,
          time: answerTimeouts[difficulty] - timer,
        },
      });
      // Reset the timer
      setTimer(answerTimeouts[difficulty]);
    },
    [dispatch, state, difficulty, timer, dashboardDispatch],
  );

  const formatTimer = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Call handleAnswerClick on timeout
          handleAnswerClick(''); // Submit empty answer on timeout
          return answerTimeouts[difficulty];
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [difficulty, timer, handleAnswerClick]);

  return (
    <>
      {answers.map((answer) => (
        <StyledAnswerButton
          key={answer}
          variant="contained"
          color="primary"
          onClick={() => handleAnswerClick(answer)}
        >
          <p dangerouslySetInnerHTML={{ __html: answer }} />
        </StyledAnswerButton>
      ))}
      <div className="flex w-full items-center justify-between">
        <span>
          Score: {state?.points} / {state?.questions.length}
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
  difficulty: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.string),
};

export default AnswerButtons;
