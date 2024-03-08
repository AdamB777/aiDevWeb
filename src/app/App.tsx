import { Container, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid'
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <>
      <Outlet/>
    </>
  );
}

export default App;
