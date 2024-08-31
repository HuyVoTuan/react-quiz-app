import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQuestions = createAsyncThunk(
  'questions/fetch',
  async (
    { signal, category, difficulty, type, questionAmounts },
    { rejectWithValue },
  ) => {
    try {
      const API_URL_QUERY = `https://opentdb.com/api.php?amount=${questionAmounts}&category=${category}&difficulty=${difficulty}&type=${type}`;
      const response = await fetch(API_URL_QUERY, {
        signal,
      });

      if (!response.ok)
        throw new Error(
          'Network response was not ok. Failed to fetch questions.',
        );

      const result = await response.json();

      return {
        data: result.results,
      };
    } catch (error) {
      if (error.name !== 'AbortError') {
        return rejectWithValue({
          error: error.message,
        });
      }
    }
  },
);

export const answerQuestion = (answer) => {
  return {
    type: 'questions/answerQuestion',
    payload: {
      answer,
    },
  };
};

export const resetQuestions = () => {
  return {
    type: 'questions/resetQuestions',
  };
};
