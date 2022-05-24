import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ProfitLoss() {

    const [total, setTotal] = React.useState(0.0);

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
                  setTotal(result["data"].reduce((a,b) => {
                    return a + b["pnl"]
                  }, 0.0))

              } else {
                alert("Error while fetching profile")
              }
            }, 
            (error) => {
              console.log(error);
            }
          )
})

  return (
    <Card sx={{ minWidth: 275, borderStyle:"solid", margin:2, padding:2 }}>
        <Typography variant='h4'>Total Profit and Loss</Typography>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Total PnL
        </Typography>
        <Typography variant="h5" component="div">
          {total.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
}