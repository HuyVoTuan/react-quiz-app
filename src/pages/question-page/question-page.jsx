import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useQuestionPageReducer from './hooks/question-page-hook';

// Components
import Main from '../../components/main';
import Header from '../../components/header';
import AnswerButtons from './components/answer-buttons';

// MUI Components
import { CircularProgress, Button } from '@mui/material';

const QuestionPage = () => {
  // React router
  const location = useLocation();
  const navigate = useNavigate();
  const { userOptions } = location.state || {};

  // Reducer hook
  const [state, dispatch] = useQuestionPageReducer();

  // Derive state
  // Combine correct and incorrect answers
  const combinedAnswers =
    state?.status === 'success'
      ? [
          ...state.questions[state?.questionIndex].incorrect_answers,
          state.questions[state?.questionIndex].correct_answer,
        ]
      : [];

  // Function handlers
  const shuffleAnswersHandler = useCallback((answers) => {
    const shuffledAnswers = [...answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);
    return shuffledAnswers;
  }, []);

  // Effect hook
  // Fetch questions from API
  useEffect(() => {
    const abortController = new AbortController();

    const fetchQuestions = async () => {
      dispatch({ type: 'FETCH_QUESTIONS', status: 'init' });

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
          type: 'FETCH_QUESTIONS',
          status: 'success',
          payload: data.results || [],
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          dispatch({
            type: 'FETCH_QUESTIONS',
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
  }, [dispatch, userOptions]);

  // Handle navigation based on state
  useEffect(() => {
    if (state?.status === 'done') {
      navigate('/result', {
        state: { from: 'Question Page', points: state?.points },
      });
    }
  }, [state, navigate]);

  // Redirect to home if state is null
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  return (
    <>
      {state?.status === 'loading' && (
        <Main>
          <CircularProgress />
        </Main>
      )}
      {state?.status === 'success' && (
        <>
          <Header title={`Question ${state?.questionIndex + 1}`} />
          <Main>
            <h1
              dangerouslySetInnerHTML={{
                __html: state?.questions[state?.questionIndex].question,
              }}
            />
            <AnswerButtons
              state={state}
              dispatch={dispatch}
              difficulty={userOptions?.difficulty}
              answers={shuffleAnswersHandler(combinedAnswers)}
            />
          </Main>
        </>
      )}
      {(state?.status === 'error' || !state) && (
        <Main>
          <p>Error fetching data: {state?.error}</p>
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
