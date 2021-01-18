import * as React from 'react';
import {
  Container,
  Grid,
} from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import axios, { AxiosRequestConfig } from 'axios';

import { Question } from '../types/Question';
import { Answer } from '../types/Answer';
import Colors from "../constants/Colors";
import { DemoQuestions } from '../mockData/DemoQuestions';
import SessionStartButton from './SessionStartButton';
import { QuestionDisplay } from './QuestionDisplay';

const styles = () =>
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
  });

interface TriviaContainerProps extends WithStyles<typeof styles>{ }

type TriviaContainerState = {
  questions: Question[],
  currentSelectedQuestionIdx: number,
  sessionActive: boolean
}

// workitem refactor all types into types container
class TriviaContainer
  extends React.Component<TriviaContainerProps, TriviaContainerState> {
  state: TriviaContainerState = {
    questions: [],
    currentSelectedQuestionIdx: -1,
    sessionActive: false
  }

  startPracticeSession(): void {
    console.log('setting mock state');

    const requestConfig: AxiosRequestConfig = {
      url: 'http://localhost:4000/start',
      method: 'get',
      headers: { 'Accept': 'application/json' }
    }

    axios(requestConfig).then((response) => {
      console.log("successful request" + response.data);
      response.data.map((question: Question) => console.log(question.question))
    }).catch((err) => {
      if (err.response) { console.log("error " + err.response) }
      else if (err.request) { console.log("error "); console.log(err.request); }
      else { console.log("something else") }
    });
    
    this.setState({
      questions: DemoQuestions,
      currentSelectedQuestionIdx: 0,
      sessionActive: true
    })
  }

  questionAnswerHandler(answer: Answer): void {
    console.log("questionHandler")
  }

  render() {
    return (
      <Container maxWidth="md">
        <Grid container spacing={3} direction="row" justify="center">
          {!this.state.sessionActive ? (
            <SessionStartButton
              startSessionHandler={this.startPracticeSession.bind(this)}
            />
          ) : (
            <QuestionDisplay
              question={this.state.questions[this.state.currentSelectedQuestionIdx]}
              questionHandler={this.questionAnswerHandler.bind(this)}
            />
          )}
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(TriviaContainer);
