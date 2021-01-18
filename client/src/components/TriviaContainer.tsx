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
import QuestionDisplay from './QuestionDisplay';

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

interface TriviaContainerProps extends WithStyles<typeof styles>{}

type TriviaContainerState = {
  questions: Question[],
  currentSelectedQuestionIdx: number,
  sessionActive: boolean,
  questionSetCorrect: boolean
}

class TriviaContainer
  extends React.Component<TriviaContainerProps, TriviaContainerState> {
  state: TriviaContainerState = {
    questions: [],
    currentSelectedQuestionIdx: -1,
    sessionActive: false, 
    questionSetCorrect: false
  }

  startPracticeSession(): void {
    const requestConfig: AxiosRequestConfig = {
      url: 'http://localhost:4000/start',
      method: 'get',
      headers: { 'Accept': 'application/json' }
    }

    axios(requestConfig).then((response) => {
      const questions: Question[] = response.data;
      
      this.setState({
        questions: questions,
        currentSelectedQuestionIdx: 0,
        sessionActive: true,
        questionSetCorrect: true
      })
    }).catch((err) => {
      if (err.response) { console.log("error in response" + err.response) }
      else if (err.request) { console.log("error in request"); console.log(err.request); }
      else { console.log("error in something else") }
    });
  }

  questionAnswerHandler(questionId: number, answer: Answer): void {
    if (!answer.correct) { this.setState({questionSetCorrect: false}) }
    const requestConfig: AxiosRequestConfig = {
      url: `http://localhost:4000/question/${questionId}`,
      method: 'post',
      headers: { 'Accept': 'application/json' },
      data: {
        'answer': answer.description
      }
    }

    axios(requestConfig)
    .catch(err => console.log(err));
  }

  restartQuestionSet(): void {
    const requestConfig: AxiosRequestConfig = {
      url: 'http://localhost:4000/questions',
      method: 'get',
      headers: { 'Accept': 'application/json' }
    }

    axios(requestConfig).then((response) => {
      const parsed = JSON.parse(response.data);
      const questions: Question[] = parsed;
      
      this.setState({
        questions: questions,
        currentSelectedQuestionIdx: 0,
        sessionActive: true,
        questionSetCorrect: true
      })
    }).catch((err) => {
      if (err.response) { console.log("error in response" + err.response) }
      else if (err.request) { console.log("error in request"); console.log(err.request); }
      else { console.log("error in something else") }
    });
  }

  advanceQuestionHandler() {
    if (this.state.currentSelectedQuestionIdx < 14) {
      this.setState({currentSelectedQuestionIdx: this.state.currentSelectedQuestionIdx + 1})
    } else {
      if (this.state.questionSetCorrect) {
        this.setState({
          sessionActive: false
        })
      } else {
        this.restartQuestionSet()
      }
    } 
  }

  randomizeElements(arr: Answer[]): Answer[] {
    let randomIndex = Math.floor(Math.random() * Math.floor(arr.length));
    let randomized: [Answer] = [arr[randomIndex]];
    arr.splice(randomIndex, 1);

    while (arr.length > 0) {
      randomIndex = Math.floor(Math.random() * Math.floor(arr.length));
      randomized.push(arr[randomIndex]);
      arr.splice(randomIndex, 1);
    }

    return randomized;
  };

  compileAnswers(question: Question): Answer[] { 
    let answers: Answer[] = [
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

// workitem change the way we send answers from service in view model to flatten