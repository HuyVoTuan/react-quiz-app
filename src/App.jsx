import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import StartPage from './pages/start-page';
import QuestionPage from './pages/question-page';
import MainLayout from './layouts/main-layout';
import ResultPage from './pages/result-page';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<StartPage />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
