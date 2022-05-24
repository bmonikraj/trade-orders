import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function Portfolio() {

    const [rows, setRows] = React.useState([]);
    
    React.useEffect(() => {
        fetch(`api/portfolio/holdings`, {
            method: 'get',
            headers: new Headers({
              'X-Token': window.localStorage.getItem("trade-token")
            })
          })
          .then( res => res.json())
          .then(
            (result) => {
              if ("status" in result && result["status"] === "success"){
                setRows(result["data"])

              } else {
                alert("Error while fetching profile")
              }
            }, 
            (error) => {
              console.log(error);
            }
          )
}, [rows])

    
  return (
    <TableContainer component={Paper} sx={{borderStyle:"solid", margin:2, padding:2}}>
        <Typography variant='h4'>Profile Information</Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Trading Symbol</TableCell>
            <TableCell align="right">Exchange</TableCell>
            <TableCell align="right">ISIN</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Authorised Date</TableCell>
            <TableCell align="right">Average Price</TableCell>
            <TableCell align="right">Last Price</TableCell>
            <TableCell align="right">Close Price</TableCell>
            <TableCell align="right">Profit and Loss</TableCell>
            <TableCell align="right">Day Change</TableCell>
            <TableCell align="right">Day Change (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.tradingsymbol}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.tradingsymbol}
              </TableCell>
              <TableCell align="right">{row.exchange}</TableCell>
              <TableCell align="right">{row.isin}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.authorised_date.split('T')[0]}</TableCell>
              <TableCell align="right">{row.average_price.toFixed(2)}</TableCell>
              <TableCell align="right">{row.last_price.toFixed(2)}</TableCell>
              <TableCell align="right">{row.close_price.toFixed(2)}</TableCell>
              <TableCell align="right">{row.pnl.toFixed(2)}</TableCell>
              <TableCell align="right">{row.day_change.toFixed(2)}</TableCell>
              <TableCell align="right">{row.day_change_percentage.toFixed(2)} %</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
