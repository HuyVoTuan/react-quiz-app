import { useReducer } from 'react';

const questionPageReducer = (state, action) => {
  const { type, status, payload } = action;

  switch (type) {
    case 'FETCH_QUESTIONS':
      {
        if (status === 'init') {
          return { ...state, status: 'loading', error: null };
        }

        if (status === 'success') {
          return { ...state, status: 'success', questions: payload };
        }

        if (status === 'failure') {
          return { ...state, status: 'error', error: payload };
        }
      }
      break;

    // Answers the question
    case 'ANSWER_QUESTION': {
      const isCorrectAnswer =
        state.questions[state.questionIndex].correct_answer === payload;

      const updatedPoints = isCorrectAnswer ? state.points + 1 : state.points;
      const isLastQuestion = state.questionIndex === state.questions.length - 1;

      return {
        ...state,
        status: isLastQuestion ? 'done' : state.status,
        questionIndex: isLastQuestion
          ? state.questionIndex
          : state.questionIndex + 1,
        points: updatedPoints,
      };
    }

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const useQuestionPageReducer = () => {
  const [state, dispatch] = useReducer(questionPageReducer, {
    questions: [],
    status: 'loading', // loading, success, error, done
    questionIndex: 0,
    points: 0,
    error: null,
  });

  return [state, dispatch];
};

export default useQuestionPageReducer;
