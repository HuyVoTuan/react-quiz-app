import { createAsyncThunk } from '@reduxjs/toolkit';

// Create an async thunk to fetch the categories from the API => This is a Promise with 3 states: pending, fulfilled, rejected
export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async ({ signal }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://opentdb.com/api_category.php', {
        signal,
      });

      if (!response.ok)
        throw new Error(
          'Network response was not ok. Failed to fetch categories.',
        );

      const result = await response.json();

      return {
        data: result.trivia_categories,
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
