import PropTypes from 'prop-types';

// MUI Components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

// Components
import DashboardTableRow from './dashboard-table-row';

const createRows = (sourceUsers, sourceQuizHistoryDetails) => {
  return sourceUsers.map((user) => ({
    id: user.id,
    username: user.username,
    totalQuizzes: user.quizHistories.length,
    totalOverallScores: user.quizHistories.reduce((totalAcc, historyId) => {
      const currentHistory = sourceQuizHistoryDetails[historyId];
      const totalScores = currentHistory.entries.reduce(
        (acc, entry) => (entry.isCorrect ? acc + 1 : acc),
        0,
      );
      return totalAcc + totalScores;
    }, 0),
    histories: user.quizHistories.map((historyId) => ({
      ...sourceQuizHistoryDetails[historyId],
      id: historyId,
      totalScores: sourceQuizHistoryDetails[historyId].entries.reduce(
        (acc, entry) => {
          return entry.isCorrect ? acc + 1 : acc;
        },
        0,
      ),
      totalQuestions: sourceQuizHistoryDetails[historyId].entries.length,
    })),
  }));
};

const DashboardTable = ({ sourceUsers, sourceQuizHistoryDetails }) => {
  const sortedRows = createRows(sourceUsers, sourceQuizHistoryDetails).sort(
    (a, b) => b.totalOverallScores - a.totalOverallScores,
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
              Username
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
              Total Quizzes
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
              Overall Scores
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row, index) => (
            <DashboardTableRow key={row.id} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;

DashboardTable.propTypes = {
  sourceUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      quizHistories: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
  sourceQuizHistoryDetails: PropTypes.objectOf(
    PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired,
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
};
