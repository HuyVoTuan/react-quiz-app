import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestions } from '../actions/questionsActions';

const initialState = {
  questions: [],
  status: 'loading', // loading, success, error, done
  error: null,
  questionIndex: 0,
  finalScores: 0,
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      const { questions, questionIndex, finalScores } = state;
      const { answer } = action.payload;

      const isCorrectAnswer =
        questions[questionIndex].correct_answer === answer;
      const isLastQuestion = questionIndex === questions.length - 1;

      state.status = isLastQuestion ? 'done' : state.status;
      state.questionIndex = isLastQuestion ? questionIndex : questionIndex + 1;
      state.finalScores = isCorrectAnswer ? finalScores + 1 : finalScores;
    },

    resetQuestions: (state) => {
      state.questions = [];
      state.status = 'loading';
      state.error = null;
      state.questionIndex = 0;
      state.finalScores = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'success';
        state.questions = action.payload.data;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload?.error || 'Something went wrong!';
      });
  },
});

export default questionsSlice.reducer;
