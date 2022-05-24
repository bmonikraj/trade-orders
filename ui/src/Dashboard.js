import Box from '@mui/material/Box';
import React from "react";
import Chart from './HistoricalChart';
import Profile from './Profile';
import Portfolio from './Portfolio';
import ProfitLoss from './ProfitLoss';
import PlaceOrder from './PlaceOrder';

function Dashboard() {
    return (
        <React.Fragment>
        <Box sx={{ display:"flex", flexDirection:"column" }}>
            <Box>
                <Chart/>
            </Box>
            <Box>
                <Profile/>
            </Box>
            <Box>
                <Portfolio/>
            </Box>
            <Box>
                <ProfitLoss/>
            </Box>
            <Box>
                <PlaceOrder/>
            </Box>
        </Box>
    </React.Fragment>
    )
}

export default Dashboard;