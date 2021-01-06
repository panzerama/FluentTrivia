import React from 'react'
import CSS from 'csstype'
import { Question } from './Question'

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
  return (
    <div style={styles.container}>
      <span style={styles.questionText}>{question.question}</span>
      <button style={styles.buttonStyle} onClick={() => questionSelectionHandler(question)}>Answer</button>
    </div>
  )
}