import React from 'react'
import { Question } from './Question'
import CSS from 'csstype'

export type QuestionDisplayProps = {
  question: Question
  questionHandler?: () => boolean
}

const styles: CSS.Properties = {
  margin: '20px'
}

type Answer = {
  description: string
  correct: boolean
}

export const QuestionDisplay = ({ question, questionHandler }: QuestionDisplayProps) => {
  const randomizeElements = (arr: [Answer]) => {

    let randomIndex = Math.floor(Math.random() * Math.floor(arr.length))
    let randomized: [Answer] = [arr[randomIndex]]
    arr.splice(randomIndex, 1)

    console.log(arr)

    while (arr.length > 0) {
      randomIndex = Math.floor(Math.random() * Math.floor(arr.length))
      randomized.push(arr[randomIndex])
      arr.splice(randomIndex, 1)
    }

    return randomized
  }

  const compileAnswers = (question: Question) => {
    let answers: [Answer] = [
      {
        description: question.correct_answer,
        correct: true
      }
    ]

    question.incorrect_answers.map((answer) => {
      answers.push(
        {
          description: answer,
          correct: false
        }
      )
    })

    return answers
  }

  const randomizedAnswers = randomizeElements(compileAnswers(question))

  return (
    <div style={styles}>
      <span>{question.question}</span>
      <ul>
        {/* workitem: randomize the display of correct v. incorrect */}
        <li>{question.correct_answer}</li>
        {question.incorrect_answers.map((answer) => {
          return <li>{answer}</li>
        })}
      </ul>
    </div>
  )
}
