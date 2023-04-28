import React, { useState, useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material/';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function UserDetails() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/booking/');
      const json = await response.json();
      console.log(json)
      setData(json.data);
    };
    fetchData();
  }, []);

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Travellers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.currency}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.travellers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserDetails;
