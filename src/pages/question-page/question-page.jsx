import { useEffect } from 'react';
import useAppReducer from '../../libs/app-reducer';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import Main from '../../components/main';
import AnswerButtons from './components/answer-buttons';

// MUI Components
import { CircularProgress, Button } from '@mui/material';

// Constants
import API_URL from '../../constants/api-url';
import Header from '../../components/header';

const QuestionPage = () => {
  // React router
  const location = useLocation();
  const navigate = useNavigate();
  const { userOptions } = location.state || {};

  // Reducer hook
  const [state, dispatch] = useAppReducer();

  // Effect hook
  // Fetch questions from API
  useEffect(() => {
    const abortController = new AbortController();

    const fetchQuestions = async () => {
      dispatch({ type: 'FETCH_QUESTIONS_INIT' });

      try {
        const API_URL_QUERY = API_URL['query']
          .replace('{category}', userOptions.category)
          .replace('{difficulty}', userOptions.difficulty)
          .replace('{type}', userOptions.type)
          .replace('{amount}', userOptions.questionAmounts);

        const response = await fetch(API_URL_QUERY, {
          signal: abortController.signal,
        });

        if (!response.ok)
          throw new Error(
            'Network response was not ok. Failed to fetch questions.',
          );

        const data = await response.json();

        dispatch({
          type: 'FETCH_QUESTIONS_SUCCESS',
          payload: data.results || [],
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          dispatch({ type: 'FETCH_QUESTIONS_FAILURE', payload: error.message });
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
    if (state.status === 'done') {
      navigate('/result', {
        state: { from: 'Question Page', points: state.points },
      });
    }
  }, [state.status, navigate, state.points]);

  // Derive state
  // Combine correct and incorrect answers
  const combinedAnswers =
    state.status === 'success'
      ? [
          ...state.questions[state.questionIndex].incorrect_answers,
          state.questions[state.questionIndex].correct_answer,
        ]
      : [];

  return (
    <>
      {state.status === 'loading' && (
        <Main>
          <CircularProgress />
        </Main>
      )}
      {state.status === 'success' && (
        <>
          <Header title={`Question ${state.questionIndex + 1}`} />
          <Main>
            <h1
              dangerouslySetInnerHTML={{
                __html: state.questions[state.questionIndex].question,
              }}
            />
            <AnswerButtons
              answers={combinedAnswers}
              difficulty={userOptions.difficulty}
              state={state}
              dispatch={dispatch}
            />
          </Main>
        </>
      )}
      {state.status === 'error' && (
        <Main>
          <p>Error fetching data: {state.error}</p>
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
