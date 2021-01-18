import React from "react";

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

type AnswerOptions = {
  description: string,
  correct: boolean
}

/* workitem: do i need to export the props types? */
export type QuestionDisplayProps = {
  question: Question;
  questionHandler: (answer: Answer) => void;
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

  const randomizeElements = (arr: [AnswerOptions]): [AnswerOptions] => {
    let randomIndex = Math.floor(Math.random() * Math.floor(arr.length));
    let randomized: [AnswerOptions] = [arr[randomIndex]];
    arr.splice(randomIndex, 1);

    console.log(arr);

    while (arr.length > 0) {
      randomIndex = Math.floor(Math.random() * Math.floor(arr.length));
      randomized.push(arr[randomIndex]);
      arr.splice(randomIndex, 1);
    }

    return randomized;
  };

  const compileAnswers = (question: Question): [AnswerOptions] => {
    let answers: [AnswerOptions] = [
      {
        description: question.correct_answer,
        correct: true,
      },
    ];

    question.incorrect_answers.map((answer) => {
      answers.push({
        description: answer,
        correct: false,
      });
    });

    return answers;
  };

  const randomizedAnswers = randomizeElements(compileAnswers(question));

  return (
    <Grid xs={12}>
    <Card>
      <CardContent>
      <Typography className={classes.title} gutterBottom>
          {question.question}
        </Typography>
        <List className={classes.list}>
          {randomizedAnswers.map((answerOption) => {
            return <ListItem key={answerOption.description}><Button variant="contained">{answerOption.description}</Button></ListItem>
          })}
        </List>
      </CardContent>
      </Card>
      </Grid>
  );
};
