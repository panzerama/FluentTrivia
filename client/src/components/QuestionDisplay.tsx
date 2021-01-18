import React, { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  List,
  ListItem,
  Button,
  Grid
} from "@material-ui/core";

import { Question } from '../types/Question';
import { Answer } from '../types/Answer';

/* workitem: do i need to export the props types? */
export type QuestionDisplayProps = {
  question: Question;
  answers: Answer[];
  questionHandler: (questionId: number, answer: Answer) => void;
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  list: {
    display: 'flex',
    flexDirection: 'row'
  }
});

export const QuestionDisplay = ({
  question,
  answers,
  questionHandler,
}: QuestionDisplayProps) => {
  const classes = useStyles();

  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
  const [wasAnswered, setWasAnswered] = useState(false);

  //workitem useEffect to prevent re-rendering on correct/incorrect

  const answerHandler = (answer: Answer): void => {
    // workitem style the display differently for correct or incorrect
    console.log(`answerHandler for ${answer.description} with ${answer.correct ? "correct " : "incorrect "} answer`)
    setAnsweredCorrectly(answer.correct);
    setWasAnswered(true);
    questionHandler(question.id, answer);
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            {question.question}
          </Typography>
          { wasAnswered ? <Typography>{ answeredCorrectly ? "Correct" : "Incorrect" }</Typography> : "" }
          <List className={classes.list}>
            {answers.map((answer) => {
              return (
                <ListItem key={answer.description}>
                  <Button onClick={() => answerHandler(answer)} disabled={wasAnswered} variant="contained">{answer.description}</Button>
                </ListItem>
              )
            })}
          </List>
          { wasAnswered ? <Button>Next</Button> : "" }
        </CardContent>
      </Card>
    </Grid>
  );
};
// workitem refactor answer option into component...?
