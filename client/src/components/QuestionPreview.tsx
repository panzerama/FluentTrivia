import React from 'react'
import CSS from 'csstype'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core'
import { Question } from './Question'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const styles: {[ key: string ] : CSS.Properties } = {
  buttonStyle: {
    flexShrink: 0,
    marginLeft: '5px'
  },
  questionText: {
    flexGrow: 1,
    minWidth: '50px'
  },
  container: {
    display: 'flex',
    maxWidth: '500px',
    margin: '10px'
  }
}

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