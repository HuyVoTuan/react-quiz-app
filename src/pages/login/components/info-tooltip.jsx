import PropTypes from 'prop-types';

// MUI Components
import { Box, Tooltip, Typography } from '@mui/material';

const InfoTooltip = ({ children }) => {
  return (
    <Tooltip
      title={
        <Box sx={{ maxWidth: 300, p: 2 }}>
          <Typography variant="h6">Sign In Information</Typography>
          <Typography
            variant="body1"
            sx={{
              marginY: 1,
            }}
          >
            Please use one of these account credentials
          </Typography>

          <Typography variant="body2">
            1. Email: <strong>votuanhuy@example.com</strong>
            <Box component="span" display="block" ml={2}>
              Password: <strong>123</strong>
            </Box>
          </Typography>

          <Typography variant="body2">
            2. Email: <strong>tonynguyen@example.com</strong>
            <Box component="span" display="block" ml={2}>
              Password: <strong>123</strong>
            </Box>
          </Typography>

          <Typography variant="body2">
            1. Email: <strong>trungduong@example.com</strong>
            <Box component="span" display="block" ml={2}>
              Password: <strong>123</strong>
            </Box>
          </Typography>
        </Box>
      }
      placement="right"
      arrow
    >
      {children}
    </Tooltip>
  );
};

export default InfoTooltip;

InfoTooltip.propTypes = {
  children: PropTypes.node,
};
