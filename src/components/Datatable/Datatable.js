import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

function Datatable(props) {
    const classes = useStyles();
    let rows = [];
    let columns = [];
    if(props && props.values && props.values.length) {
        rows = [...props.values];
        columns = [...props.labels];

        return (
        <div className="TopTable">
           <h1>{props.heading}</h1>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                    {
                        columns.map((column) => (
                            <StyledTableCell align="right">{column}</StyledTableCell>
                        ))
                    }
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.key}>
                     {
                         columns.map((column, index) => (
                            <StyledTableCell align="right">{row[Object.keys(row)[index+1]]}</StyledTableCell>
                         ))
                     }
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
        )
    } else {
        return null;
    }
}

export default Datatable
