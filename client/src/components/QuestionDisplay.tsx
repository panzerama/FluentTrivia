import React from 'react'
import { Question } from './Question'
import CSS from 'csstype'

export type QuestionDisplayProps = {
  question?: Question
  questionHandler?: () => boolean
}

const styles: CSS.Properties = {
  margin: '20px'
}

export const QuestionDisplay = ({ question, questionHandler }: QuestionDisplayProps) => {
  return (
    <div style={styles}>
      <span>{question?.question}</span>
    </div>
  )
}
