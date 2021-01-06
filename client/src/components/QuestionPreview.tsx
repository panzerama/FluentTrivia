import React from 'react'

export type IQuestion = {
  category : string
  type : string
  difficulty : string
  question : string
  correct_answer : string
  incorrect_answers : [string]
}

type QuestionPreviewProps = { question: IQuestion }

export const QuestionPreview = ({ question }: QuestionPreviewProps) => {
  return (
    <ul>
      <li>{question.category}</li>
      <li>{question.question}</li>
    </ul>
  )
}