// Components
import StartPage from './pages/start-page';
import AnswerPage from './pages/answer-page';
import MainLayout from './layouts/main-layout';
import ResultPage from './pages/result-page';

const App = () => {
  return (
    <>
      <MainLayout title="Quiz App">
        <h1>Start Page</h1>
        <StartPage />
        <br />
        <br />
        <h1>Answer Page</h1>
        <AnswerPage />
        <br />
        <br />
        <h1>Result Page</h1>
        <ResultPage />
      </MainLayout>
    </>
  );
};

export default App;
