import { useReducer } from 'react';

const appReducer = (state, action) => {
  switch (action.type) {
    // Categories
    case 'FETCH_CATEGORIES_INIT':
      return { ...state, status: 'loading', error: null };
    case 'FETCH_CATEGORIES_SUCCESS':
      return { ...state, status: 'success', categories: action.payload };
    case 'FETCH_CATEGORIES_FAILURE':
      return { ...state, status: 'error', error: action.payload };

    // Questions
    case 'FETCH_QUESTIONS_INIT':
      return { ...state, status: 'loading', error: null };
    case 'FETCH_QUESTIONS_SUCCESS':
      return { ...state, status: 'success', questions: action.payload };
    case 'FETCH_QUESTIONS_FAILURE':
      return { ...state, status: 'error', error: action.payload };

    // Answers the question
    case 'ANSWER_QUESTION': {
      const isCorrect =
        state.questions[state.questionIndex].correct_answer === action.payload;

      const updatedPoints = isCorrect ? state.points + 1 : state.points;

      if (state.questionIndex === state.questions.length - 1) {
        return {
          ...state,
          status: 'done',
          points: updatedPoints,
        };
      }

      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        points: updatedPoints,
      };
    }

    default:
      break;
  }
};

const useAppReducer = () => {
  const [state, dispatch] = useReducer(appReducer, {
    categories: [],
    questions: [],
    questionIndex: 0,
    points: 0,
    status: 'loading', // loading, success, error, 'done
    error: null,
  });

  return [state, dispatch];
};

export default useAppReducer;
