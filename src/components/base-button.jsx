import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// MUI Component
import { Button } from '@mui/material';

const validButtonTypes = ['submit', 'button'];
const validButtonVariants = ['outlined', 'contained'];

const BaseButton = ({
  text = 'Button',
  type = 'button',
  variant = 'contained',
  naviagateDestination = null,
}) => {
  const navigate = useNavigate();

  return (
    <Button
      type={type}
      variant={variant}
      onClick={() => navigate(naviagateDestination)}
    >
      {text}
    </Button>
  );
};

export default BaseButton;

BaseButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(validButtonTypes),
  variant: PropTypes.oneOf(validButtonVariants),
  naviagateDestination: PropTypes.string,
};
