import { useReducer } from 'react';

const startPageReducer = (state, action) => {
  const { type, status, payload } = action;

  switch (type) {
    case 'FETCH_CATEGORIES':
      {
        if (status === 'init') {
          return { ...state, status: 'loading', error: null };
        }

        if (status === 'success') {
          return { ...state, status: 'success', categories: payload };
        }

        if (status === 'failure') {
          return { ...state, status: 'error', error: payload };
        }
      }
      break;

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const useStartPageReducer = () => {
  const [state, dispatch] = useReducer(startPageReducer, {
    categories: [],
    status: 'loading', // loading, success, error
    error: null,
  });

  return [state, dispatch];
};

export default useStartPageReducer;
