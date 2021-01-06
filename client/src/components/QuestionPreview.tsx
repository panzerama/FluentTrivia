import React from 'react'
import CSS from 'csstype'

// Type Declaration
export type Question = {
  category : string
  type : string
  difficulty : string
  question : string
  correct_answer : string
  incorrect_answers : [string]
}

const styles: {[ key: string ] : CSS.Properties } = {
  buttonStyle: {
    flexShrink: 1,
    minWidth: '50px'
  },
  questionText: {
    flexGrow: 1,
    minWidth: '50px'
  },
  container: {
    display: 'flex'
  }
}

export const QuestionPreview = ({ question }: { question: Question }) => {
  return (
    <div style={styles.container}>
      <span style={styles.questionText}>{question.question}</span>
      <button style={styles.buttonStyle}>Answer</button>
    </div>
  )
}