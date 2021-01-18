import * as React from 'react';
import {
  Container,
  Grid,
} from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import { Question } from '../types/Question';
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

class TriviaContainer
  extends React.Component<TriviaContainerProps, TriviaContainerState> {
  state: TriviaContainerState = {
    questions: [],
    currentSelectedQuestionIdx: -1,
    sessionActive: false
  }

  startPracticeSession(): void {
    console.log('setting mock state');
    this.setState({
      questions: DemoQuestions,
      currentSelectedQuestionIdx: 0,
      sessionActive: true
    })
  }

  render() {
    return (
      <Container maxWidth="md">
        <Grid container spacing={3} direction="row" justify="center">
          {this.state.sessionActive ? (
            <SessionStartButton
              startSessionHandler={this.startPracticeSession.bind(this)}
            />
          ) : (
            <QuestionDisplay
              question={this.state.questions[currentSelectedQuestionIdx]}
              questionHandler={() => {
                console.log("questionHandler");
              }}
            />
          )}
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles)(TriviaContainer);
