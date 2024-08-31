import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import {
  addHistory,
  addUserHistory,
  updateUserHistory,
} from '../../../store/actions/dashboardActions';

// Utils
import timerFormatter from '../../../utils/timerFormatter.util';

// MUI Components
import Button from '@mui/material/Button';
import { answerQuestion } from '../../../store/actions/questionsActions';

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

const AnswerButtons = ({ chosenDifficulty, shuffledAnswers }) => {
  const dispatch = useDispatch();
  const { questions, questionIndex, finalScores } = useSelector(
    (state) => state.questions,
  );

  const [currentHistoryId, setCurrentHistoryId] = useState(null);
  const [timer, setTimer] = useState(ANSWER_TIMEOUTS[chosenDifficulty]);

  const userId = JSON.parse(window.localStorage.getItem('user_id'));

  const handleAnswerClick = useCallback(
    (answer) => {
      const questionData = questions[questionIndex];

      const newEntry = createNewEntry(
        questionData.question,
        questionData.correct_answer,
        answer,
        ANSWER_TIMEOUTS[chosenDifficulty] - timer,
      );

      if (!currentHistoryId) {
        const newHistoryId = uuidv4();

        dispatch(
          addHistory(
            newHistoryId,
            new Date().toLocaleString('en-US', {
              timeZoneName: 'short',
            }),
            chosenDifficulty,
            [newEntry],
          ),
        );

        setCurrentHistoryId(newHistoryId);
        dispatch(addUserHistory(userId, newHistoryId));
      } else {
        dispatch(updateUserHistory(currentHistoryId, newEntry));
      }

      dispatch(answerQuestion(answer));
      setTimer(ANSWER_TIMEOUTS[chosenDifficulty]);
    },
    [
      userId,
      dispatch,
      questions,
      questionIndex,
      chosenDifficulty,
      currentHistoryId,
      timer,
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
          Score: {finalScores} / {questions.length}
        </span>
        <span className={timer < 10 ? 'animate-pulse-fast text-red-600' : ''}>
          Timer: {timerFormatter(timer)}
        </span>
      </div>
    </>
  );
};

AnswerButtons.propTypes = {
  chosenDifficulty: PropTypes.string.isRequired,
  shuffledAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnswerButtons;
