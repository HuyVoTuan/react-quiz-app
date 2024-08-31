import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { resetQuestions } from '../../store/actions/questionsActions';

// Components
import Main from '../../components/main';
import Header from '../../components/header';
import BaseButton from '../../components/base-button';
import ErrorPage from '../../pages/error';

const ResultPage = () => {
  const location = useLocation();
  const { finalScores } = location.state;

  return (
    <>
      <Header title={`Result`} />
      <Main>
        <h1 className="mb-2 text-4xl font-bold">Final Score: {finalScores}</h1>
        <BaseButton text="Go to dashboard" naviagateDestination="/dashboard" />
      </Main>
    </>
  );
};

const WrappedResultPageWithErrorBoundary = () => {
  const dispatch = useDispatch();

  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <ErrorPage onReset={() => dispatch(resetQuestions())} />
      )}
    >
      <ResultPage />
    </ErrorBoundary>
  );
};

export default WrappedResultPageWithErrorBoundary;
