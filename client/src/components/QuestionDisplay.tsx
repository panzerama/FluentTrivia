import React, { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  List,
  Button,
  Grid
} from "@material-ui/core";

import { AnswerOption } from '../components/AnswerOption'
import { Question } from '../types/Question';
import { Answer } from '../types/Answer';

type QuestionDisplayProps = {
  question: Question;
  answers: Answer[];
  questionHandler: (questionId: number, answer: Answer) => void;
  nextButtonHandler: () => void;
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

const QuestionDisplay = ({
  question,
  answers,
  questionHandler,
  nextButtonHandler
}: QuestionDisplayProps) => {
  const classes = useStyles();

  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
  const [wasAnswered, setWasAnswered] = useState(false);

  const answerHandler = (answer: Answer): void => {
    setAnsweredCorrectly(answer.correct);
    setWasAnswered(true);
    questionHandler(question.id, answer);
  }

  const nextButtonTapped = () => {
    setAnsweredCorrectly(null);
    setWasAnswered(false);
    nextButtonHandler()
  }

  const resultMessage = () => {
    if (wasAnswered) {
      const message = answeredCorrectly ? "Correct" : `Incorrect. The correct answer is ${question.correct_answer}`;
      const color = answeredCorrectly ? 'primary' : 'error';
      return <Typography color={color}>{ message }</Typography>
    } else {
      return ""
    }
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography className={classes.title} color='primary' gutterBottom>
            {question.question}
          </Typography>
          { resultMessage() }
          <List className={classes.list}>
            {answers.map((answer) => {
              return <AnswerOption answer={answer} answerHandler={answerHandler} wasAnswered={wasAnswered}/>
            })}
          </List>
          { wasAnswered ? <Button onClick={() => nextButtonTapped()}>Next</Button> : "" }
        </CardContent>
      </Card>
    </Grid>
  );
};

export default QuestionDisplay;
// workitem prevent appearance of elements from increasing space awkwardly