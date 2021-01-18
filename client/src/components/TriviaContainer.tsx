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
    console.log('setting state');

    const requestConfig: AxiosRequestConfig = {
      url: 'http://localhost:4000/start',
      method: 'get',
      headers: { 'Accept': 'application/json' }
    }

    axios(requestConfig).then((response) => {
      console.log("successful request" + response.data);
      const questions: Question[] = response.data;
      
      this.setState({
        questions: questions,
        currentSelectedQuestionIdx: 0,
        sessionActive: true
      })
    }).catch((err) => {
      if (err.response) { console.log("error in response" + err.response) }
      else if (err.request) { console.log("error in request"); console.log(err.request); }
      else { console.log("error in something else") }
    });
  }

  questionAnswerHandler(questionId: number, answer: Answer): void {
    console.log(`questionHandler for id ${questionId} and answer to ${answer.description}`);
  }

  advanceQuestionHandler() {
    this.setState({currentSelectedQuestionIdx: this.state.currentSelectedQuestionIdx + 1})
  }

  randomizeElements(arr: [Answer]): [Answer] {
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

  compileAnswers(question: Question): [Answer] { 
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
              answers={this.randomizeElements(this.compileAnswers(this.state.questions[this.state.currentSelectedQuestionIdx]))}
              questionHandler={this.questionAnswerHandler.bind(this)}
              nextButtonHandler={this.advanceQuestionHandler.bind(this)}
            />
          )}
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(TriviaContainer);

// workitem clean up notation
// workitem change the way we send answers from service in view model to flatten