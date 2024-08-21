import { useState } from 'react';
import PropTypes from 'prop-types';

// MUI Components
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const DashboardTableRow = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.username}
        </TableCell>
        <TableCell align="right">{row.difficulty}</TableCell>
        <TableCell align="right">{row.totalQuestions}</TableCell>
        <TableCell align="right">{row.totalScores}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>Answer</TableCell>
                    <TableCell align="right">Is Correct</TableCell>
                    <TableCell align="right">Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map(
                    (historyRow) => (
                      console.log(historyRow),
                      (
                        <TableRow key={historyRow.id}>
                          <TableCell component="th" scope="row">
                            {historyRow.question}
                          </TableCell>
                          <TableCell>{historyRow.answer}</TableCell>
                          <TableCell align="right">
                            {`${historyRow.isCorrect ? 'Yes' : 'No'}`}
                          </TableCell>
                          <TableCell align="right">{historyRow.time}</TableCell>
                        </TableRow>
                      )
                    ),
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DashboardTableRow;

DashboardTableRow.propTypes = {
  row: PropTypes.shape({
    username: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    totalScores: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
        isCorrect: PropTypes.bool.isRequired,
        time: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
