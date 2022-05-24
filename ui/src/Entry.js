import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Login() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [clicked, setClicked] = React.useState(0);

    React.useEffect(() => {
        if (clicked !== 0) {
        fetch("/api/user/login", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
          })
          .then( res => res.json())
          .then(
            (result) => {
              if ("status" in result && result["status"] === "success"){
                alert("Login success")
                console.log(result)
                window.localStorage.setItem("trade-token",result["token"])
                window.open("/","_self")
              } else {
                alert("Login failed")
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
      <div>
        <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="login-username" label="Username" variant="outlined" required
                onChange={ event => setUsername(event.target.value) }
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
            <TextField id="login-password" label="Password" variant="outlined" type="password" required
                onChange={ event => setPassword(event.target.value)}
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
                  <Button variant="contained" onClick={ () => setClicked(clicked + 1) } >Login</Button>
        </Box>
    </div>
    );
  }

  function Register() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [fullname, setFullname] = React.useState("");
    const [clicked, setClicked] = React.useState(0);

    React.useEffect(() => {
        if (clicked !== 0 && password === confirmPassword) {
        fetch("/api/user/register", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "fullname": fullname
            })
          })
          .then( res => res.json())
          .then(
            (result) => {
              if ("status" in result && result["status"] === "success"){
                alert("Registration success")
                console.log(result)
              } else {
                alert("Registration failed")
                console.log(result)
              }
            }, 
            (error) => {
              console.log(error);
            }
          )
        }
        if (clicked !== 0 && password !== confirmPassword) {
            alert("Password and confirm password dont match")
        }
    }, [clicked])

    return (
      <div>
        <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Username" variant="outlined" required 
                onChange={ event => setUsername(event.target.value)}
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
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" required
            onChange={ event => setPassword(event.target.value)}
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
            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" type="password" required
            onChange={ event => setConfirmPassword(event.target.value)}
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
            <TextField id="outlined-basic" label="Full Name" variant="outlined" required
            onChange={ event => setFullname(event.target.value)}
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
                  <Button variant="contained" onClick={ () => setClicked(clicked + 1) } >Register</Button>
        </Box>
    </div>
    );
  }

export default function Entry() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} centered onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Login/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Register />
      </TabPanel>
    </Box>
  );
}
