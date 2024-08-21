import { useDashboard } from '../../contexts/use-dashboard-context';

// Components
import Header from '../../components/header';
import DashboardTable from './components/dashboard-table';

const Dashboard = () => {
  const { state } = useDashboard();

  return (
    <>
      <Header title="Dashboard" />
      <p>{state?.username && 'Huy'}</p>
      <DashboardTable
        username={state?.username}
        answersLog={state?.answersLog}
      />
    </>
  );
};

export default Dashboard;
