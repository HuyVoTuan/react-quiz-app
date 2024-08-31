import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Components
import StartPage from './pages/start-page';
import MainLayout from './layouts/main-layout';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login';
import GuestRoute from './components/guest-route';
import AuthRoute from './components/auth-route';
import WrappedResultPageWithErrorBoundary from './pages/result-page';
import WrappedQuestionPageWithErrorBoundary from './pages/question-page';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <AuthRoute>
                <MainLayout>
                  <StartPage />
                </MainLayout>
              </AuthRoute>
            }
          />
          <Route
            path="/result"
            element={
              <AuthRoute>
                <MainLayout>
                  <WrappedResultPageWithErrorBoundary />
                </MainLayout>
              </AuthRoute>
            }
          />
          <Route
            path="/question"
            element={
              <AuthRoute>
                <MainLayout>
                  <WrappedQuestionPageWithErrorBoundary />
                </MainLayout>
              </AuthRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </AuthRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
