import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material/';



function UserDetails() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8000/booking/');
      const json = await response.json();
      setData(json.data);
    };
    fetchData();
  }, []);


  return (
    <TableContainer component={Paper}>
      <h1>User Details</h1>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Travelers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.email}>
              <TableCell>
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
