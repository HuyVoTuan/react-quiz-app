import { useEffect } from 'react';
import useAppReducer from '../../libs/app-reducer';

// Constants
import API_URL from '../../constants/api-url';

// Components
import Main from '../../components/main';
import Header from '../../components/header';
import UncontrolledForm from './components/uncontrolled-form';

// MUI Components
import { CircularProgress } from '@mui/material';

const StartPage = () => {
  // Reducer hook
  const [state, dispatch] = useAppReducer();

  // Effect hook
  // Fetch categories from API
  useEffect(() => {
    const abortController = new AbortController();

    const fetchCategories = async () => {
      dispatch({ type: 'FETCH_CATEGORIES_INIT' });

      try {
        const response = await fetch(API_URL['base'], {
          signal: abortController.signal,
        });

        if (!response.ok)
          throw new Error(
            'Network response was not ok. Failed to fetch categories.',
          );

        const data = await response.json();

        dispatch({
          type: 'FETCH_CATEGORIES_SUCCESS',
          payload: data.trivia_categories,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          dispatch({
            type: 'FETCH_CATEGORIES_FAILURE',
            payload: error.message,
          });
        }
      }
    };

    fetchCategories();

    // Clean-up function
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  return (
    <>
      {state.status === 'loading' && (
        <Main>
          <CircularProgress />
        </Main>
      )}
      {state.status === 'success' && (
        <>
          <Header title="Quiz App" />
          <Main>
            <UncontrolledForm categories={state.categories} />
          </Main>
        </>
      )}
      {state.status === 'error' && (
        <Main>
          <p>Error fetching data: {state.error}</p>
        </Main>
      )}
    </>
  );
};

export default StartPage;
