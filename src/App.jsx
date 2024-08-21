import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import StartPage from './pages/start-page';
import QuestionPage from './pages/question-page';
import MainLayout from './layouts/main-layout';
import ResultPage from './pages/result-page';
import Dashboard from './pages/dashboard';
import { DashboardProvider } from './contexts/dashboard-context';
import { Login } from './pages/login';
import GuestRoute from './components/guest-route';
import AuthRoute from './components/auth-route';

const App = () => {
  return (
    <DashboardProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/" element={<AuthRoute><MainLayout><StartPage /></MainLayout></AuthRoute>} />
          <Route path="/result" element={<AuthRoute><MainLayout><ResultPage /></MainLayout></AuthRoute>} />
          <Route path="/question" element={<AuthRoute><MainLayout><QuestionPage /></MainLayout></AuthRoute>} />
          <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        </Routes>
      </BrowserRouter>
    </DashboardProvider>
  );
};

export default App;
