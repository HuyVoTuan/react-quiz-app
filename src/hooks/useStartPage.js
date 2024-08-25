import { useReducer } from 'react';

const initialState = {
  categories: [],
  status: 'loading', // loading, success, error
  error: null,
};

const startPageReducer = (state, action) => {
  switch (action.type) {
    case 'categories/fetch':
      {
        if (action.status === 'init') {
          return { ...state, status: 'loading', error: null };
        }

        if (action.status === 'success') {
          return { ...state, status: 'success', categories: action.payload };
        }

        if (action.status === 'failure') {
          return { ...state, status: 'error', error: action.payload };
        }
      }
      break;

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const useStartPage = () => {
  const [state, dispatch] = useReducer(startPageReducer, initialState);

  return [state, dispatch];
};

export default useStartPage;
