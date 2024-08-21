import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import StartPage from './pages/start-page';
import QuestionPage from './pages/question-page';
import MainLayout from './layouts/main-layout';
import ResultPage from './pages/result-page';
import Dashboard from './pages/dashboard';
import { DashboardProvider } from './contexts/dashboard-context';

const App = () => {
  return (
    <DashboardProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<StartPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/question" element={<QuestionPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DashboardProvider>
  );
};

export default App;
