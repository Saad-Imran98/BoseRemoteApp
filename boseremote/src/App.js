import './App.css';
import {Grid, AppBar, Toolbar, Typography} from "@mui/material";
import Volume from "./Volume";

function App() {
  return (
    <div>
        <div>
            <AppBar position="fixed">
                <Toolbar>Dad Management System</Toolbar>
            </AppBar>
        </div>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
                <Volume/>
            </Grid>
        </Grid>

    </div>
  );
}

export default App;
