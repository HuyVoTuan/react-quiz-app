import PropTypes from 'prop-types';
import { createContext, useReducer } from 'react';

// Reducer function
const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_LOG':
      return {
        ...state,
        userLog: action.payload,
      };

    case 'SET_ANSWER_LOG':
      return {
        ...state,
        answersLog: [...state.answersLog, action.payload],
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Create context
export const DashboardContext = createContext();

// Provider component
export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, {
    userLog: null,
    answersLog: [],
  });

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Prop types
DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
