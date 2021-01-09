import React from 'react'

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core'

import { Question } from '../types/Question'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

type QuestionPreviewProps = {
  question: Question
  questionSelectionHandler: (question: Question) => void
}

export const QuestionPreview = ({ question, questionSelectionHandler }: QuestionPreviewProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {question.question}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => questionSelectionHandler(question)}>Answer</Button>
      </CardActions>
    </Card>
  )
}