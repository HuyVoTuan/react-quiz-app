import { useReducer } from 'react';

const initialState = {
  questions: [],
  status: 'loading', // loading, success, error, done
  questionIndex: 0,
  finalScores: 0,
  error: null,
};

const questionPageReducer = (state, action) => {
  switch (action.type) {
    case 'questions/fetch':
      {
        if (action.status === 'init') {
          return { ...state, status: 'loading', error: null };
        }

        if (action.status === 'success') {
          return { ...state, status: 'success', questions: action.payload };
        }

        if (action.status === 'failure') {
          return { ...state, status: 'error', error: action.payload };
        }
      }
      break;

    // Answers the question
    case 'questions/answer': {
      const isCorrectAnswer =
        state.questions[state.questionIndex].correct_answer === action.payload;

      const updatedScores = isCorrectAnswer
        ? state.finalScores + 1
        : state.finalScores;

      const isLastQuestion = state.questionIndex === state.questions.length - 1;

      console.log({
        state,
      });

      return {
        ...state,
        status: isLastQuestion ? 'done' : state.status,
        questionIndex: isLastQuestion
          ? state.questionIndex
          : state.questionIndex + 1,
        finalScores: updatedScores,
      };
    }

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const useQuestionPage = () => {
  const [state, dispatch] = useReducer(questionPageReducer, initialState);
  return [state, dispatch];
};

export default useQuestionPage;
