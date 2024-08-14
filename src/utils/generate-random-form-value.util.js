const generateRandomValue = (key, categoryResponse) => {
  switch (key) {
    case 'category':
      return categoryResponse[
        Math.floor(Math.random() * categoryResponse.length)
      ].name;
    case 'difficulty': {
      const difficulties = ['easy', 'medium', 'hard'];
      return difficulties[Math.floor(Math.random() * difficulties.length)];
    }
    case 'type': {
      const types = ['multiple-choices', 'true-false'];
      return types[Math.floor(Math.random() * types.length)];
    }
    case 'questionAmounts':
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    default:
      return '';
  }
};

export default generateRandomValue;
