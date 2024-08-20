import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

// Utils
import generateRandomValue from '../../../utils/generate-random-form-value.util';

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

const UncontrolledForm = ({ categories }) => {
  // React router
  const navigate = useNavigate();

  // React hook form
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      category: '',
      difficulty: '',
      type: '',
      questionAmounts: '',
    },
  });

  // Functions handler
  const onFormSubmitHandler = (userOptions) => {
    const processedUserOptions = {
      category:
        userOptions?.category || generateRandomValue('category', categories),
      difficulty: userOptions?.difficulty || generateRandomValue('difficulty'),
      type: userOptions?.type || generateRandomValue('type'),
      questionAmounts:
        Number(userOptions?.questionAmounts) ||
        generateRandomValue('questionAmounts'),
    };

    // Reset form
    reset();

    // Navigate to question page with processed user options
    navigate('/question', {
      state: { from: 'Start Page', userOptions: processedUserOptions },
    });
  };

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onFormSubmitHandler)}
      >
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={field.value}
                label="Category"
                onChange={(e) => {
                  field.onChange(e);
                }}
              >
                {categories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="difficulty"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
              <Select
                labelId="difficulty-select-label"
                id="difficulty-select"
                value={field.value}
                label="Difficulty"
                onChange={(e) => {
                  field.onChange(e);
                }}
              >
                <MenuItem value={'easy'}>Easy</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'hard'}>Hard</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel id="type-select-label">Type</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                value={field.value}
                label="Type"
                onChange={(e) => {
                  field.onChange(e);
                }}
              >
                <MenuItem value={'multiple'}>Multiple Choices</MenuItem>
                <MenuItem value={'boolean'}>True / False</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="questionAmounts"
          control={control}
          render={({ field }) => (
            <TextField
              type="number"
              id="question-amounts"
              value={field.value}
              label="Question Amounts"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
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

export default UncontrolledForm;

UncontrolledForm.propTypes = {
  categories: PropTypes.array,
};
