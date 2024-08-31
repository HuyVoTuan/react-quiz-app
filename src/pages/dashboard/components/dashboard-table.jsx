import { useSelector } from 'react-redux';

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

const createRows = (users, quizHistoryDetails) => {
  return users.map((user) => ({
    id: user.id,
    username: user.username,
    totalQuizzes: user.quizHistories.length,
    totalOverallScores: user.quizHistories.reduce((totalAcc, historyId) => {
      const currentHistory = quizHistoryDetails[historyId];
      const totalScores = currentHistory.entries.reduce(
        (acc, entry) => (entry.isCorrect ? acc + 1 : acc),
        0,
      );
      return totalAcc + totalScores;
    }, 0),
    histories: user.quizHistories.map((historyId) => ({
      ...quizHistoryDetails[historyId],
      id: historyId,
      totalScores: quizHistoryDetails[historyId].entries.reduce(
        (acc, entry) => {
          return entry.isCorrect ? acc + 1 : acc;
        },
        0,
      ),
      totalQuestions: quizHistoryDetails[historyId].entries.length,
    })),
  }));
};

const DashboardTable = () => {
  const { users, quizHistoryDetails } = useSelector((state) => state.dashboard);

  const sortedRows = createRows(users, quizHistoryDetails).sort(
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
