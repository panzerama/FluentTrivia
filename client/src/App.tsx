import React from 'react'
import { QuestionPreview } from './components/QuestionPreview'
import { QuestionDisplay } from './components/QuestionDisplay'
import { Question } from './components/Question'
import { DemoQuestions } from './mockData/DemoQuestions'

function App() {
  const [questions, setQuestions] = React.useState(DemoQuestions)
  const [currentQuestion, setCurrentQuestion] = React.useState <Question>()

  return (
    <div>
      <button>Practice Mode</button>
      <QuestionDisplay question={currentQuestion}/>
      {questions.map((question) => { 
        return <QuestionPreview question={question as Question} questionSelectionHandler={setCurrentQuestion}/>
      })}
    </div>
  );
}

export default App;
