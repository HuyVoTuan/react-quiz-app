import { useCallback, useEffect } from 'react';
import useQuestionPage from '../../hooks/useQuestionPage';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import Main from '../../components/main';
import Header from '../../components/header';
import AnswerButtons from './components/answer-buttons';

// MUI Components
import { CircularProgress, Button } from '@mui/material';

const QuestionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userOptions } = location.state || {};

  console.log(userOptions.difficulty);

  const [state, dispatch] = useQuestionPage();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchQuestions = async () => {
      dispatch({ type: 'questions/fetch', status: 'init' });

      try {
        const API_URL_QUERY = `${import.meta.env.VITE_BE_API}/api.php?amount=${userOptions?.questionAmounts}&category=${userOptions?.category}&difficulty=${userOptions?.difficulty}&type=${userOptions?.type}`;
        const response = await fetch(API_URL_QUERY, {
          signal: abortController.signal,
        });

        if (!response.ok)
          throw new Error(
            'Network response was not ok. Failed to fetch questions.',
          );

        const data = await response.json();

        dispatch({
          type: 'questions/fetch',
          status: 'success',
          payload: data.results || [],
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          dispatch({
            type: 'questions/fetch',
            status: 'error',
            payload: error.message,
          });
        }
      }
    };

    fetchQuestions();

    // Clean-up function
    return () => {
      abortController.abort();
    };
  }, [dispatch, userOptions, navigate]);

  useEffect(() => {
    if (!state || state?.status === 'error') {
      navigate('/');
    }

    if (state?.status === 'done') {
      navigate('/result', {
        state: { from: 'Question Page', finalScores: state?.finalScores },
      });
    }
  }, [state, navigate]);

  const combinedAnswers =
    state?.status === 'success'
      ? [
          ...state.questions[state.questionIndex].incorrect_answers,
          state.questions[state.questionIndex].correct_answer,
        ]
      : null;

  const shuffleAnswersHandler = useCallback((answers) => {
    const shuffledAnswers = [...answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);
    return shuffledAnswers;
  }, []);

  return (
    <>
      {state?.status === 'loading' && (
        <Main>
          <CircularProgress />
        </Main>
      )}
      {state?.status === 'success' && combinedAnswers && (
        <>
          <Header title={`Question ${state.questionIndex + 1}`} />
          <Main>
            <h1
              dangerouslySetInnerHTML={{
                __html: state.questions[state.questionIndex].question,
              }}
            />
            <AnswerButtons
              state={state}
              dispatch={dispatch}
              chosenDifficulty={userOptions?.difficulty}
              shuffledAnswers={shuffleAnswersHandler(combinedAnswers)}
            />
          </Main>
        </>
      )}
      {state?.status === 'error' && (
        <Main>
          <p>Error fetching data: {state?.error || 'No state found.'}</p>
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
      )}
    </>
  );
};

export default QuestionPage;
