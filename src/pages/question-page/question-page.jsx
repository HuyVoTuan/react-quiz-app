import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  fetchQuestions,
  resetQuestions,
} from '../../store/actions/questionsActions';
import { ErrorBoundary } from 'react-error-boundary';

// Components
import Main from '../../components/main';
import Header from '../../components/header';
import AnswerButtons from './components/answer-buttons';
import ErrorPage from '../../pages/error';

// MUI Components
import { CircularProgress } from '@mui/material';
import BaseButton from '../../components/base-button';

const shuffleAnswersHandler = (answers) => {
  const shuffledAnswers = [...answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  return shuffledAnswers;
};

const QuestionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userOptions } = location.state;

  const dispatch = useDispatch();
  const { questions, questionIndex, finalScores, error, status } = useSelector(
    (state) => state.questions,
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchQuestions({ signal, ...userOptions }));

    return () => controller.abort();
  }, [dispatch, userOptions]);

  useEffect(() => {
    if (status === 'done') {
      dispatch(resetQuestions());
      navigate('/result', {
        state: { finalScores: finalScores },
      });
    }
  }, [dispatch, navigate, questions, status, finalScores]);

  const combinedAnswers =
    status === 'success'
      ? [
          ...questions[questionIndex].incorrect_answers,
          questions[questionIndex].correct_answer,
        ]
      : null;

  return (
    <>
      {status === 'loading' && (
        <Main>
          <CircularProgress />
        </Main>
      )}
      {status === 'success' && combinedAnswers && (
        <>
          <Header title={`Question ${questionIndex + 1}`} />
          <Main>
            <h1
              dangerouslySetInnerHTML={{
                __html: questions[questionIndex].question,
              }}
            />
            <AnswerButtons
              chosenDifficulty={userOptions?.difficulty}
              shuffledAnswers={shuffleAnswersHandler(combinedAnswers)}
            />
          </Main>
        </>
      )}
      {status === 'error' && (
        <Main>
          <p>Error fetching data: {error || 'No state found.'}</p>
          <BaseButton text="Back to home" naviagateDestination={'/'} />
        </Main>
      )}
    </>
  );
};

const WrappedQuestionPageWithErrorBoundary = () => {
  const dispatch = useDispatch();

  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <ErrorPage onReset={() => dispatch(resetQuestions())} />
      )}
    >
      <QuestionPage />
    </ErrorBoundary>
  );
};

export default WrappedQuestionPageWithErrorBoundary;
