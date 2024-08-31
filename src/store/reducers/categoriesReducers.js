import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../actions/categoriesActions';

const initialState = {
  categories: [],
  status: 'loading', // loading, success, error
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'success';
        state.categories = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload?.error || 'Something went wrong!';
      });
  },
});

export default categoriesSlice.reducer;
