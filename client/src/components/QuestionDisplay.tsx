import React from "react";

import {
  Card,
  CardContent, 
  Typography,
  makeStyles,
  List,
  ListItem
} from "@material-ui/core";

import { Question } from "./Question";

/* workitem: do i need to export the props types? */
export type QuestionDisplayProps = {
  question: Question;
  questionHandler?: () => boolean;
};

type Answer = {
  description: string;
  correct: boolean;
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

export const QuestionDisplay = ({
  question,
  questionHandler,
}: QuestionDisplayProps) => {
  const classes = useStyles();

  const randomizeElements = (arr: [Answer]) => {
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

  const compileAnswers = (question: Question) => {
    let answers: [Answer] = [
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
    <Card>
      <CardContent>
      <Typography className={classes.title} gutterBottom>
          {question.question}
        </Typography>
        <List>
          {randomizedAnswers.map((answer) => {
            return <ListItem>{answer.description}</ListItem>
          })}
        </List>
      </CardContent>
    </Card>
  );
};
