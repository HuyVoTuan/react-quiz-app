import { useEffect } from 'react';
import useStartPageReducer from './hooks/start-page-hook';

// Components
import Main from '../../components/main';
import Header from '../../components/header';
import UncontrolledForm from './components/uncontrolled-form';

// MUI Components
import { CircularProgress } from '@mui/material';

const StartPage = () => {
  // Reducer hook
  const [state, dispatch] = useStartPageReducer();

  // Effect hook
  // Fetch categories from API
  useEffect(() => {
    const abortController = new AbortController();

    const fetchCategories = async () => {
      dispatch({ type: 'FETCH_CATEGORIES', status: 'init' });

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BE_API}/api_category.php`,
          {
            signal: abortController.signal,
          },
        );

        if (!response.ok)
          throw new Error(
            'Network response was not ok. Failed to fetch categories.',
          );

        const data = await response.json();

        dispatch({
          type: 'FETCH_CATEGORIES',
          status: 'success',
          payload: data.trivia_categories,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          dispatch({
            type: 'FETCH_CATEGORIES',
            status: 'failure',
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
      {state?.status === 'loading' && (
        <Main>
          <CircularProgress />
        </Main>
      )}
      {state?.status === 'success' && (
        <>
          <Header title="Start The Quiz" />
          <Main>
            <UncontrolledForm categories={state?.categories} />
          </Main>
        </>
      )}
      {state?.status === 'error' && (
        <Main>
          <p>Error fetching data: {state?.error}</p>
        </Main>
      )}
    </>
  );
};

export default StartPage;
