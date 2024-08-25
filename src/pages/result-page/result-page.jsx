import { useLocation } from 'react-router-dom';

// Components
import Main from '../../components/main';
import Header from '../../components/header';
import BaseButton from '../../components/base-button';

const ResultPage = () => {
  // React router
  const location = useLocation();
  const { finalScores } = location.state || {};

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

export default ResultPage;
