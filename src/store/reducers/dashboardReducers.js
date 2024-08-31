import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      id: 'user-1',
      username: 'Vo Tuan Huy',
      quizHistories: ['history-1'],
    },
    {
      id: 'user-2',
      username: 'Tony Nguyen',
      quizHistories: ['history-2'],
    },
    {
      id: 'user-3',
      username: 'Trung Duong',
      quizHistories: ['history-3'],
    },
    {
      id: 'user-4',
      username: 'Mock User',
      quizHistories: ['history-4'],
    },
  ],
  accounts: {
    'user-1': {
      email: 'votuanhuy@example.com',
      password: '123',
    },
    'user-2': {
      email: 'tonynguyen@example.com',
      password: '123',
    },
    'user-3': {
      email: 'trungduong@example.com',
      password: '123',
    },
  },
  quizHistoryDetails: {
    'history-1': {
      startDate: '8/22/2024, 11:35:05 PM GMT+7 ',
      difficulty: 'easy',
      entries: [
        {
          id: '1',
          question: 'What is your name?',
          correctAnswer: 'Huy',
          userAnswer: 'Huy',
          isCorrect: true,
          time: '60',
        },
      ],
    },
    'history-2': {
      startDate: '8/21/2024, 11:35:05 PM GMT+7 ',
      difficulty: 'medium',
      entries: [
        {
          id: '1',
          question: 'What is your name?',
          correctAnswer: 'Tony Nguyen',
          userAnswer: 'Tony Jah',
          isCorrect: false,
          time: '10',
        },
        {
          id: '2',
          question: 'Where are you from?',
          correctAnswer: 'Vietnam',
          userAnswer: 'Vietnam',
          isCorrect: true,
          time: '20',
        },
        {
          id: '3',
          question: 'What is your favorite color?',
          correctAnswer: 'Blue',
          userAnswer: 'Blue',
          isCorrect: true,
          time: '60',
        },
      ],
    },
    'history-3': {
      startDate: '8/20/2024, 11:35:05 PM GMT+7 ',
      difficulty: 'hard',
      entries: [
        {
          id: '1',
          question: 'What is your name?',
          correctAnswer: 'Trung Duong',
          userAnswer: 'Trung Duong',
          isCorrect: true,
          time: '20',
        },
      ],
    },
    'history-4': {
      startDate: '8/19/2024, 11:35:05 PM GMT+7 ',
      difficulty: 'easy',
      entries: [
        {
          id: '1',
          question: 'What is your name?',
          correctAnswer: 'Mock User',
          userAnswer: 'Mock User Dep Trai',
          isCorrect: false,
          time: '10',
        },
      ],
    },
  },
  currentUser: null,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    userLogin(state, action) {
      const { email, password } = action.payload;

      const user = state.users.find(
        (user) =>
          state.accounts[user.id].email === email &&
          state.accounts[user.id].password === password,
      );

      state.currentUser = user ? user : null;
      state.error = user ? null : 'Invalid credentials';
    },

    userLogout(state) {
      state.currentUser = null;
    },

    addHistory(state, action) {
      const { historyId, startDate, difficulty, entries } = action.payload;
      state.quizHistoryDetails[historyId] = {
        startDate,
        difficulty,
        entries,
      };
    },

    addUserHistory(state, action) {
      const { userId, historyId } = action.payload;
      const user = state.users.find((_user) => _user.id === userId);
      user.quizHistories.push(historyId);
    },

    updateUserHistory(state, action) {
      const { historyId, newEntry } = action.payload;
      state.quizHistoryDetails[historyId].entries.push(newEntry);
    },
  },
});

export default dashboardSlice.reducer;
