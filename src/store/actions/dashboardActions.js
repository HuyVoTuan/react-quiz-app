export const userLogin = (data) => {
  return {
    type: 'dashboard/userLogin',
    payload: data,
  };
};

export const userLogout = () => {
  return {
    type: 'dashboard/userLogout',
  };
};

export const addHistory = (historyId, startDate, difficulty, entries) => {
  return {
    type: 'dashboard/addHistory',
    payload: {
      historyId,
      startDate,
      difficulty,
      entries,
    },
  };
};

export const addUserHistory = (userId, historyId) => {
  return {
    type: 'dashboard/addUserHistory',
    payload: {
      userId,
      historyId,
    },
  };
};

export const updateUserHistory = (historyId, newEntry) => {
  return {
    type: 'dashboard/updateUserHistory',
    payload: {
      historyId,
      newEntry,
    },
  };
};
