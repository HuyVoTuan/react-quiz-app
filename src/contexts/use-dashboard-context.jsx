import { useContext } from 'react';
import { DashboardContext } from './dashboard-context';

// Custom hook to use the context
export const useDashboard = () => useContext(DashboardContext);
