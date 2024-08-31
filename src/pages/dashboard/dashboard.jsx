// Components
import Header from '../../components/header';
import DashboardTable from './components/dashboard-table';
import UserInfo from './components/user-info';

const Dashboard = () => {
  return (
    <>
      <Header title="Dashboard" />
      <UserInfo />
      <DashboardTable />
    </>
  );
};

export default Dashboard;
