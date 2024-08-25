import { useDashboard } from '../../contexts/dashboard-context';

// Components
import Header from '../../components/header';
import DashboardTable from './components/dashboard-table';

const Dashboard = () => {
  const { state } = useDashboard();

  return (
    <>
      <Header title="Dashboard" />
      <DashboardTable
        sourceUsers={state.users}
        sourceQuizHistoryDetails={state.quizHistoryDetails}
      />
    </>
  );
};

export default Dashboard;
