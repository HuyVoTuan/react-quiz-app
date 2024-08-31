import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './reducers/categoriesReducers';
import questionsReducer from './reducers/questionsReducer';
import dashboardReducer from './reducers/dashboardReducers';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    questions: questionsReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
