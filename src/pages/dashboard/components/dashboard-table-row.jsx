import { useState } from 'react';
import PropTypes from 'prop-types';
import timerFormatter from '../../../utils/timerFormatter.util';

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
  Chip,
  Pagination,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const DashboardTableRow = ({ row, index }) => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const historyPerPage = 2; // Number of history entries per page

  const onPageChangeHandler = (event, newPage) => {
    setPage(newPage);
  };

  // Determine which history entries to display on the current page
  const displayedHistories = row.histories.slice(
    (page - 1) * historyPerPage,
    page * historyPerPage,
  );

  // Determine background color based on rank
  const getBackgroundColor = (index) => {
    switch (index) {
      case 0:
        return '#D4AF37'; // First place
      case 1:
        return '#c0c0c0 '; // Second place, Silver Hex Code
      case 2:
        return '#CD7F32'; // Third place, Bronze Hex Code
      default:
        return 'transparent'; // No special color for other ranks
    }
  };

  return (
    <>
      <TableRow
        sx={{
          '& > *': {
            borderBottom: 'unset',
            backgroundColor: getBackgroundColor(index),
          },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.username}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.totalQuizzes}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.totalOverallScores}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              {displayedHistories.map((historyEntry) => (
                <Box key={historyEntry.id} sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Date: {historyEntry.startDate} | Difficulty:{' '}
                    {historyEntry.difficulty} | Questions:{' '}
                    {historyEntry.totalQuestions} | Scores:{' '}
                    {historyEntry.totalScores}
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Question</TableCell>
                        <TableCell align="right">Correct Answer</TableCell>
                        <TableCell align="right">User Answer</TableCell>
                        <TableCell align="right">Is Correct</TableCell>
                        <TableCell align="right">Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {historyEntry.entries.map(({ id, ...value }) => (
                        <TableRow key={id}>
                          <TableCell component="th" scope="row">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: value.question,
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: value.correctAnswer,
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: value.userAnswer,
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            {value.isCorrect ? (
                              <Chip label="Correct" color="success" />
                            ) : (
                              <Chip label="Incorrect" color="error" />
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {timerFormatter(value.time).toString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              ))}
              <Pagination
                count={Math.ceil(row.totalQuizzes / historyPerPage)} // Calculate total pages
                page={page}
                onChange={onPageChangeHandler}
                variant="outlined"
                color="primary"
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

DashboardTableRow.propTypes = {
  row: PropTypes.shape({
    username: PropTypes.string.isRequired,
    totalOverallScores: PropTypes.number.isRequired,
    totalQuizzes: PropTypes.number.isRequired,
    histories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        difficulty: PropTypes.string.isRequired,
        totalScores: PropTypes.number.isRequired,
        totalQuestions: PropTypes.number.isRequired,
        entries: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            question: PropTypes.string.isRequired,
            correctAnswer: PropTypes.string.isRequired,
            userAnswer: PropTypes.string.isRequired,
            isCorrect: PropTypes.bool.isRequired,
            time: PropTypes.string.isRequired,
          }),
        ).isRequired,
      }),
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DashboardTableRow;
