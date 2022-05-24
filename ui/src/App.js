import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
import Dashboard from './Dashboard';
import Entry from './Entry';
import { useEffect, useState } from 'react';

const theme = createTheme();

function Main() {
  const [profile, setProfile] = useState(null);
  const [showEntry, setShowEntry] = useState(true);
  useEffect(() => {
    if (profile === null) {
      fetch("/api/user/profile", {
        method: 'get',
        headers: new Headers({
          'X-Token': window.localStorage.getItem("trade-token")
        })
      })
      .then( res => res.json())
      .then(
        (result) => {
          if ("status" in result && result["status"] === "success"){
            setProfile(result["data"]);
            setShowEntry(false);
          } else {
            setProfile({});
            setShowEntry(true);
          }
        }, 
        (error) => {
          setProfile(null);
          setShowEntry(true);
          console.log(error);
        }
      )
    }
  }, [profile]);

  return (
    <div>
      {(showEntry && <Entry/>) || <Dashboard/>}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Main />
      </Container>
    </ThemeProvider>
  );
}

export default App;
