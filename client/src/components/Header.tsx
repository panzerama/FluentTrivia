import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  root: {
    backgroundColor: '#4a7b9d',
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position='static'>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Fluent Trivia</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header