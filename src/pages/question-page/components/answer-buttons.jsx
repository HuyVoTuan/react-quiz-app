import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled';
import { useEffect, useState, useCallback } from 'react';
import { useDashboard } from '../../../contexts/dashboard-context';

// Utils
import timerFormatter from '../../../utils/timerFormatter.util';

// MUI Components
import Button from '@mui/material/Button';

// Styled Components
const StyledAnswerButton = styled(Button)`
  margin: 0.5rem 0;
  width: 100%;
`;

const ANSWER_TIMEOUTS = {
  hard: 20,
  medium: 30,
  easy: 60,
};

const createNewEntry = (question, correctAnswer, userAnswer, time) => ({
  id: uuidv4(),
  question,
  correctAnswer,
  userAnswer,
  isCorrect: userAnswer === correctAnswer,
  time: time.toString(),
});

// React Component
const AnswerButtons = ({
  state: questionState,
  dispatch: questionDispatch,
  chosenDifficulty,
  shuffledAnswers,
}) => {
  const { dispatch: dashboardDispatch } = useDashboard();
  const [currentHistoryId, setCurrentHistoryId] = useState(null);
  const [timer, setTimer] = useState(ANSWER_TIMEOUTS[chosenDifficulty]);

  const userId = JSON.parse(window.localStorage.getItem('user_id'));

  const handleAnswerClick = useCallback(
    (answer) => {
      const questionData =
        questionState?.questions[questionState?.questionIndex];

      const newEntry = createNewEntry(
        questionData.question,
        questionData.correct_answer,
        answer,
        ANSWER_TIMEOUTS[chosenDifficulty] - timer,
      );

      if (!currentHistoryId) {
        const newHistoryId = uuidv4();

        dashboardDispatch({
          type: 'dashboard/addHistory',
          payload: {
            historyId: newHistoryId,
            startDate: new Date().toLocaleString('en-US', {
              timeZoneName: 'short',
            }),
            difficulty: chosenDifficulty,
            entries: [newEntry],
          },
        });

        setCurrentHistoryId(newHistoryId);

        dashboardDispatch({
          type: 'dashboard/addUserHistory',
          payload: {
            userId,
            historyId: newHistoryId,
          },
        });
      } else {
        dashboardDispatch({
          type: 'dashboard/updateUserHistory',
          payload: {
            historyId: currentHistoryId,
            newEntry,
          },
        });
      }

      questionDispatch({ type: 'questions/answer', payload: answer });

      // Reset the timer
      setTimer(ANSWER_TIMEOUTS[chosenDifficulty]);
    },
    [
      questionState,
      questionDispatch,
      dashboardDispatch,
      userId,
      timer,
      chosenDifficulty,
      currentHistoryId,
    ],
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleAnswerClick(''); // Submit empty answer on timeout
          return ANSWER_TIMEOUTS[chosenDifficulty];
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [chosenDifficulty, handleAnswerClick]);

  return (
    <>
      {shuffledAnswers.map((answer) => (
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
          Score: {questionState?.finalScores} /{' '}
          {questionState?.questions.length}
        </span>
        <span className={timer < 10 ? 'animate-pulse-fast text-red-600' : ''}>
          Timer: {timerFormatter(timer)}
        </span>
      </div>
    </>
  );
};

AnswerButtons.propTypes = {
  state: PropTypes.shape({
    questions: PropTypes.array.isRequired,
    questionIndex: PropTypes.number.isRequired,
    finalScores: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  chosenDifficulty: PropTypes.string.isRequired,
  shuffledAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnswerButtons;
