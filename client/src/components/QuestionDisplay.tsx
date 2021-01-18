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
  questionHandler,
}: QuestionDisplayProps) => {
  const classes = useStyles();

  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  //workitem useEffect to prevent re-rendering on correct/incorrect

  const randomizeElements = (arr: [Answer]): [Answer] => {
    let randomIndex = Math.floor(Math.random() * Math.floor(arr.length));
    let randomized: [Answer] = [arr[randomIndex]];
    arr.splice(randomIndex, 1);

    console.log(arr);

    while (arr.length > 0) {
      randomIndex = Math.floor(Math.random() * Math.floor(arr.length));
      randomized.push(arr[randomIndex]);
      arr.splice(randomIndex, 1);
    }

    return randomized;
  };

  const compileAnswers = (question: Question): [Answer] => {
    let answers: [Answer] = [
      {
        description: question.correct_answer,
        correct: true,
      },
    ];

    question.incorrect_answers.forEach((answer) => {
      answers.push({
        description: answer,
        correct: false,
      });
    });

    return answers;
  };

  const randomizedAnswers = randomizeElements(compileAnswers(question));

  const answerHandler = (answer: Answer): void => {
    // workitem style the display differently for correct or incorrect
    console.log(`answerHandler for ${answer.description} with ${answer.correct ? "correct " : "incorrect "} answer`)
    setAnsweredCorrectly(answer.correct);
    questionHandler(question.id, answer);
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            {question.question}
          </Typography>
          {answeredCorrectly ? <Typography>Correct!</Typography> : <Typography>Incorrect!</Typography>}
          <List className={classes.list}>
            {randomizedAnswers.map((answer) => {
              return (
                <ListItem key={answer.description}>
                  <Button onClick={() => answerHandler(answer)} variant="contained">{answer.description}</Button>
                </ListItem>
              )
            })}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};
// workitem refactor answer option into component...?
