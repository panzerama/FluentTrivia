import React from "react";

import { Container, Grid, Button } from "@material-ui/core";

import Header from "./components/Header";
import { QuestionPreview } from "./components/QuestionPreview";
import { QuestionDisplay } from "./components/QuestionDisplay";
import { Question } from "./types/Question";
import { DemoQuestions } from "./mockData/DemoQuestions";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Colors from "./constants/Colors";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: "center",
    },
    practiceModeButton: {
      backgroundColor: Colors.yellow,
      height: "100px",
      width: "50vw",
    },
  })
);

function App() {
  const classes = useStyles();
  const [questions, setQuestions] = React.useState(DemoQuestions);
  const [currentQuestion, setCurrentQuestion] = React.useState<Question>();

  const questionDisplay = currentQuestion ? (
    <QuestionDisplay question={currentQuestion} />
  ) : (
    ""
  );

  return (
    <div>
      <Header />
      <Container maxWidth="md">
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
        >
          <Grid item xs={12}>
            <Button className={classes.practiceModeButton} variant="contained">
              Practice Mode
            </Button>
          </Grid>

          <Grid item xs={12}>
            {questionDisplay}
          </Grid>
          {questions.map((question) => {
            return (
              <Grid item xs={5}>
                <QuestionPreview
                  question={question as Question}
                  questionSelectionHandler={setCurrentQuestion}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
