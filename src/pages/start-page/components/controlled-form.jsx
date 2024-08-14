import { useState } from 'react';

// MUI Components
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const ControlledForm = () => {
  // State hook
  const [userOptions, setUserOptions] = useState({
    category: '',
    difficulty: '',
    type: '',
    questionAmounts: 0,
  });

  // Functions handler
  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    console.log(userOptions);
  };

  return (
    <>
      <Box component="form" autoComplete="off" onSubmit={onFormSubmitHandler}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={userOptions['category']}
            label="Category"
            onChange={(e) => {
              setUserOptions({ ...userOptions, category: e.target.value });
            }}
          >
            <MenuItem value={1}>LOL</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
          <Select
            labelId="difficulty-select-label"
            id="difficulty-select"
            value={userOptions['difficulty']}
            label="Difficulty"
            onChange={(e) => {
              setUserOptions({ ...userOptions, difficulty: e.target.value });
            }}
          >
            <MenuItem value={'easy'}>Easy</MenuItem>
            <MenuItem value={'medium'}>Medium</MenuItem>
            <MenuItem value={'hard'}>Hard</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            value={userOptions['type']}
            label="Type"
            onChange={(e) => {
              setUserOptions({ ...userOptions, type: e.target.value });
            }}
          >
            <MenuItem value={'multiple-choices'}>Multiple Choices</MenuItem>
            <MenuItem value={'true-false'}>True / False</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="question-amounts"
          label="Question Amounts"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => {
            setUserOptions({
              ...userOptions,
              questionAmounts: Number(e.target.value),
            });
          }}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          <Button type="submit" variant="contained">
            Get Started
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ControlledForm;
