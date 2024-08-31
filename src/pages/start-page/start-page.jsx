import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/actions/categoriesActions';

// Components
import Main from '../../components/main';
import Header from '../../components/header';
import UncontrolledForm from './components/uncontrolled-form';

// MUI Components
import { CircularProgress } from '@mui/material';

const StartPage = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories,
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchCategories({ signal }));

    return () => controller.abort();
  }, [dispatch]);

  return (
    <>
      <Header title="Start The Quiz" />
      {status === 'loading' && (
        <Main>
          <CircularProgress />
        </Main>
      )}
      {status === 'success' && (
        <>
          <Main>
            <UncontrolledForm categories={categories} />
          </Main>
        </>
      )}
      {status === 'error' && (
        <Main>
          <p>Error fetching data: {error}</p>
        </Main>
      )}
    </>
  );
};

export default StartPage;
