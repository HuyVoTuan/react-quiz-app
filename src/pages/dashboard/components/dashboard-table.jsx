import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

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

const createData = ({
  id,
  username,
  difficulty,
  totalQuestions,
  totalScores,
}) => {
  return {
    id,
    username,
    difficulty,
    totalQuestions,
    totalScores,
    history: [],
  };
};


/*
[
  {
    "username": "xxx",
    "difficulty": "xxx",
    "totalQuestions": "xxx",
    "totalScores": "xxx",
    "history": [
      { 
        id: 'xxx', 
        question: 'xxx', 
        answer: 'xxx',
        isCorrect: 'xxx',
        time: 'xxx'
      }
    ]
  },
  {
    "username": "xxx",
    "difficulty": "xxx",
    "totalQuestions": "xxx",
    "totalScores": "xxx",
    "history": [
      { 
        id: 'xxx', 
        question: 'xxx', 
        answer: 'xxx',
        isCorrect: 'xxx',
        time: 'xxx'
      }
    ]
  }
]

---- hash map ------
users [
  {
    "username": "tony",
    "difficulty": "xxx",
    "totalQuestions": "xxx",
    "totalScores": "xxx",
  }
]

history = {
  "tony": [
    { 
      id: 'xxx', 
      question: 'xxx', 
      answer: 'xxx',
      isCorrect: 'xxx',
      time: 'xxx'
    }
  ]
}

*/


function DashboardTable({ answersLog }) {
  const rows = [
    createData({
      id: uuidv4(),
      username: 'Mock User',
      difficulty: 'Mock Difficulty',
      totalQuestions: 0,
      totalScores: 0,
    }),
  ].map((row) => ({
    ...row,
    history: answersLog.map((log) => ({
      id: uuidv4(),
      ...log,
    })),
  }));

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
            <DashboardTableRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DashboardTable;

DashboardTable.propTypes = {
  username: PropTypes.string,
  answersLog: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
      isCorrect: PropTypes.bool.isRequired,
      time: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
