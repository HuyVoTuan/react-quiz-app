import { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

// MUI Components
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const createData = (
  id,
  username,
  difficulty,
  totalQuestions,
  totalScores,
  answersLog,
) => {
  return {
    id,
    username,
    difficulty,
    totalQuestions,
    totalScores,
    history: [
      {
        id: uuidv4(),
        ...answersLog,
      },
    ],
  };
};

const Row = (props) => {
  const { row } = props;
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
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow.question}
                      </TableCell>
                      <TableCell>{historyRow.answer}</TableCell>
                      <TableCell align="right">
                        {historyRow.isCorrect}
                      </TableCell>
                      <TableCell align="right">{historyRow.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const rows = [createData(uuidv4(), 'Vo Tuan Huy', 'easy', 2, 2)];

function DashboardTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Username</TableCell>
            <TableCell align="right">Difficulty</TableCell>
            <TableCell align="right">Total Questions</TableCell>
            <TableCell align="right">Total Scores</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DashboardTable;

Row.propTypes = {
  row: PropTypes.shape({
    username: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    totalScores: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
        isCorrect: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
