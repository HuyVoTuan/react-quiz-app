import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  users: [
    {
      id: 'user-1',
      username: 'Vo Tuan Huy',
      quizHistories: ['history-1'],
    },
    {
      id: 'user-2',
      username: 'Tony Nguyen',
      quizHistories: ['history-2'],
    },
    {
      id: 'user-3',
      username: 'Trung Duong',
      quizHistories: ['history-3'],
    },
    {
      id: 'user-4',
      username: 'Mock User',
      quizHistories: ['history-4'],
    },
  ],
  accounts: {
    'user-1': {
      email: 'votuanhuy@example.com',
      password: '123',
    },
    'user-2': {
      email: 'tonynguyen@example.com',
      password: '123',
    },
    'user-3': {
      email: 'trungduong@example.com',
      password: '123',
    },
  },
  quizHistoryDetails: {
    'history-1': {
      startDate: '8/22/2024, 11:35:05 PM GMT+7 ',
      difficulty: 'easy',
      entries: [
        {
          id: '1',
          question: 'What is your name?',
          correctAnswer: 'Huy',
          userAnswer: 'Huy',
          isCorrect: true,
          time: '60',
        },
      ],
    },
    'history-2': {
      startDate: '8/21/2024, 11:35:05 PM GMT+7 ',
      difficulty: 'medium',
      entries: [
        {
          id: '1',
          question: 'What is your name?',
          correctAnswer: 'Tony Nguyen',
          userAnswer: 'Tony Jah',
          isCorrect: false,
          time: '10',
        },
        {
          id: '2',
          question: 'Where are you from?',
          correctAnswer: 'Vietnam',
          userAnswer: 'Vietnam',
          isCorrect: true,
          time: '20',
        },
        {
          id: '3',
          question: 'What is your favorite color?',
          correctAnswer: 'Blue',
          userAnswer: 'Blue',
          isCorrect: true,
          time: '60',
        },
      ],
    },
    'history-3': {
      startDate: '8/20/2024, 11:35:05 PM GMT+7 ',
      difficulty: 'hard',
      entries: [
        {
          id: '1',
          question: 'What is your name?',
          correctAnswer: 'Trung Duong',
          userAnswer: 'Trung Duong',
          isCorrect: true,
          time: '20',
        },
      ],
    },
    'history-4': {
      startDate: '8/19/2024, 11:35:05 PM GMT+7 ',
      difficulty: 'easy',
      entries: [
        {
          id: '1',
          question: 'What is your name?',
          correctAnswer: 'Mock User',
          userAnswer: 'Mock User Dep Trai',
          isCorrect: false,
          time: '10',
        },
      ],
    },
  },
  currentUser: null,
  error: null,
};
// Reducer function
const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'dashboard/userLogin': {
      const user = state.users.find(
        (user) =>
          state.accounts[user.id]?.email === action.payload.email &&
          state.accounts[user.id]?.password === action.payload.password,
      );

      if (!user) {
        // Handle error: invalid credentials
        return { ...state, error: 'Invalid credentials' };
      }

      return {
        ...state,
        currentUser: user,
        error: null,
      };
    }

    case 'dashboard/userLogout': {
      return {
        ...state,
        currentUser: null,
      };
    }

    case 'dashboard/addUserHistory': {
      const updatedUsers = state.users.map((user) =>
        user.id === action.payload.userId
          ? {
              ...user,
              quizHistories: [...user.quizHistories, action.payload.historyId],
            }
          : user,
      );

      return {
        ...state,
        users: updatedUsers,
      };
    }

    case 'dashboard/updateUserHistory': {
      const updatedEntries = [
        ...state.quizHistoryDetails[action.payload.historyId].entries,
        action.payload.newEntry,
      ];

      return {
        ...state,
        quizHistoryDetails: {
          ...state.quizHistoryDetails,
          [action.payload.historyId]: {
            ...state.quizHistoryDetails[action.payload.historyId],
            entries: updatedEntries,
          },
        },
      };
    }

    case 'dashboard/addHistory':
      return {
        ...state,
        quizHistoryDetails: {
          ...state.quizHistoryDetails,
          [action.payload.historyId]: {
            startDate: action.payload.startDate,
            difficulty: action.payload.difficulty,
            entries: action.payload.entries,
          },
        },
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Create context
export const DashboardContext = createContext();

// Provider component
export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => useContext(DashboardContext);

// Prop types
DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
