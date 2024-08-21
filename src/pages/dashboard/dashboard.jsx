import { useDashboard } from '../../contexts/use-dashboard-context';

// Components
import Header from '../../components/header';
import DashboardTable from './components/dashboard-table';

const Dashboard = () => {
  const { state } = useDashboard();

  console.log(state);

  return (
    <>
      <Header title="Dashboard" />
      <p>{state?.user && 'Huy'}</p>
      <DashboardTable answersLog={state?.answersLog} />
    </>
  );
};

export default Dashboard;
