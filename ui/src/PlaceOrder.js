import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function PlaceOrder() {
    const [symbol, setSymbol] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [clicked, setClicked] = React.useState(0);

    React.useEffect(() => {
        if (clicked !== 0) {
        fetch("/api/order/place-order", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Token': window.localStorage.getItem("trade-token")
            },
            body: JSON.stringify({
                "symbol": symbol,
                "quantity": quantity,
                "price": price
            })
          })
          .then( res => res.json())
          .then(
            (result) => {
              if ("status" in result && result["status"] === "success"){
                alert("Order success. Order ID : "+result["data"]["order_id"])
                console.log(result)
                
                
              } else {
                alert("Order failed")
                console.log(result)
              }
            }, 
            (error) => {
              console.log(error);
            }
          )
        }
    }, [clicked])

    return (
      <Box sx={{borderStyle:"solid", margin:2, padding:2}}>
          <Typography variant='h4'>Orders</Typography>
        <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="order-symbol" label="Symbol" variant="outlined" required
                onChange={ event => setSymbol(event.target.value) }
                />
        </Box>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField id="order-price" label="Price" variant="outlined" required
                onChange={ event => setPrice(event.target.value)}
            />
        </Box>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField id="order-quantity" label="Quantity" variant="outlined" required type="number"
                onChange={ event => setQuantity(event.target.value)}
            />
        </Box>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                  <Button variant="contained" onClick={ () => setClicked(clicked + 1) } >Place</Button>
        </Box>
    </Box>
    );
  }