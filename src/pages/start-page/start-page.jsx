import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// Components
import UncontrolledForm from './components/uncontrolled-form';

// MUI Components
import { Box, CircularProgress } from '@mui/material';

const StartPage = () => {
  // State hook
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Effect hook
  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      setIsLoading(true); // Start loading
      try {
        const categoryResponse = await fetch(
          'https://opentdb.com/api_category.php',
        );

        const categoryData = await categoryResponse.json();

        setCategory(categoryData.trivia_categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchCategories();
  }, []);
  return (
    <>
      {isLoading ? (
        <Box
          width={550}
          height={372}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <UncontrolledForm category={category} />
      )}
    </>
  );
};

export default StartPage;

StartPage.propTypes = {
  onStartQuiz: PropTypes.func.isRequired,
};
