import { withStyles } from "@material-ui/core";
import React from "react";
import { WithStyles, Grid, Button, createStyles } from "@material-ui/core";

import Colors from "../constants/Colors";
import { DemoQuestions } from "../mockData/DemoQuestions";

const styles = createStyles({
  practiceModeButton: {
    backgroundColor: Colors.yellow,
    height: "100px",
    width: "50vw",
  },
});

interface SessionStartButtonProps extends WithStyles<typeof styles> {
  startSessionHandler: () => void;
}

function SessionStartButton(props: SessionStartButtonProps) {
  return (
    <Grid item xs={12}>
      <Button
        className={props.classes.practiceModeButton}
        variant="contained"
        onClick={() => {
          props.startSessionHandler();
        }}
      >
        Practice Mode
      </Button>
    </Grid>
  );
}

export default withStyles(styles)(SessionStartButton);
