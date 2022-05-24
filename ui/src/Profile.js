import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Profile() {

    const [userId, setUserId] = React.useState("");
    const [userType, setUserType] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [broker, setBroker] = React.useState("");

    React.useEffect(() => {
            fetch(`api/user/profile`, {
                method: 'get',
                headers: new Headers({
                  'X-Token': window.localStorage.getItem("trade-token")
                })
              })
              .then( res => res.json())
              .then(
                (result) => {
                  if ("status" in result && result["status"] === "success"){
                    setUserId(result["data"]["user_id"]);
                    setUserType(result["data"]["user_type"]);
                    setEmail(result["data"]["email"]);
                    setUserName(result["data"]["user_name"]);
                    setBroker(result["data"]["broker"]);

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
        <Typography variant='h4'>Profile Information</Typography>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          UserId
        </Typography>
        <Typography variant="h5" component="div">
          {userId}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          User Type
        </Typography>
        <Typography variant="h5" component="div">
          {userType}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Email
        </Typography>
        <Typography variant="h5" component="div">
          {email}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Username
        </Typography>
        <Typography variant="h5" component="div">
          {userName}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Broker
        </Typography>
        <Typography variant="h5" component="div">
          {broker}
        </Typography>
      </CardContent>
    </Card>
  );
}