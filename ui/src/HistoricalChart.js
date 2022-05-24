import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Plot from 'react-plotly.js';
import Typography from '@mui/material/Typography';

export default function Chart() {
    const [x,setX] = useState([]);
    const [y,setY] = useState([]);
    const [fromDate,setFromDate] = useState(null);
    const [toDate,setToDate] = useState(null);
    const [symbol,setSymbol] = useState("");
    const [clicked, setClicked] = useState(0);

    const handleChange = (event: SelectChangeEvent) => {
        setSymbol(event.target.value);
      };

    useEffect(() => {
        if (clicked !== 0) {
            fetch(`api/price/historical-data?from_date=${encodeURIComponent(fromDate.toISOString().split('T')[0])}&to_date=${encodeURIComponent(toDate.toISOString().split('T')[0])}&symbol=${encodeURIComponent(symbol)}`, {
                method: 'get',
                headers: new Headers({
                  'X-Token': window.localStorage.getItem("trade-token")
                })
              })
              .then( res => res.json())
              .then(
                (result) => {
                  if ("status" in result && result["status"] === "success"){
                    setX(result["data"].map(e => e["date"]));
                    setY(result["data"].map(e => e["price"]));

                  } else {
                    alert("Error while fetching data")
                  }
                }, 
                (error) => {
                  console.log(error);
                }
              )
        }
    }, [clicked])

    return (
        <React.Fragment>
            <Box sx={{ display:"flex", flexDirection:"column", borderStyle:"solid", margin:2, padding:2 }}>
                <Typography variant='h4'>Historical prices</Typography>
                <Box sx={{ display:"flex", flexDirection:"row" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="From Date"
                            value={fromDate}
                            onChange={(newValue) => {
                                setFromDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="To Date"
                            value={toDate}
                            onChange={(newValue) => {
                                setToDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Instrument</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={symbol}
                            label="Symbol"
                            onChange={ handleChange }
                        >
                            <MenuItem value={'NIFTY 50'}>NIFTY 50</MenuItem>
                            <MenuItem value={'NIFTY BANK'}>NIFTY BANK</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={ () => setClicked(clicked + 1) } >Fetch</Button>
                </Box>
                <Box sx={{ display:"flex", flexDirection:"row" }}>
                    <Plot
                        data={[
                            {
                                x: x,
                                y: y,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'red'},
                            }
                        ]}
                        layout={{width: "100vw", height: "30vh", title: `Price for ${symbol}`}}
                    />
                </Box>
            </Box>
        </React.Fragment>
    )
}