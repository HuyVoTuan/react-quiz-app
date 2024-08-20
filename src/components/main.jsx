import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Box } from '@mui/material';

// Styled Components
const StyledBox = styled(Box)`
  min-width: 550px;
  min-height: 372px;
  border: 1px solid #a020f0;
  border-radius: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow:
    0px 4px 15px rgba(160, 32, 240, 0.3),
    0px 8px 25px rgba(160, 32, 240, 0.2);
`;

const Main = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default Main;

Main.propTypes = {
  children: PropTypes.node,
};
