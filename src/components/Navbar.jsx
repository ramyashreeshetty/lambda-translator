import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Typography} from '@mui/material';
import Button from '@mui/material/Button';
import '../App.css';
import { makeStyles } from '@mui/styles';

const font = "'Poppins', sans-serif";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  navbar2: {
    backgroundColor: '#626ad8',
  },
  appTitle: {
    textDecoration: "none",
    color: "white",
    fontFamily: font,
  },
  navBtn: {
    fontFamily: font,
    textDecoration: "none",
    color: "white",
  },
});

export default function NavBar () {

  const classes = useStyles();

  return (
  <div className={classes.root}>
    <AppBar position="static" className={classes.navbar2} >
      <Toolbar variant="dense" sx={{ flexGrow: 1 }}>
          <Typography variant="h6" style={{ flex: 1 }} className={classes.appTitle}>
              Lambda Translator
          </Typography>
            <Button variant="text" align="right">
            <a href='https://github.com/ramyashreeshetty/lambda-translator' className={classes.navBtn}>Github</a></Button>
      </Toolbar>
    </AppBar>
  </div>
  );
}
