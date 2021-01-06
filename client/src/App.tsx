import React from 'react'
import { QuestionPreview, Question } from './components/QuestionPreview'
import { DemoQuestions } from './mockData/DemoQuestions'

function App() {
  const [questions, setQuestions] = React.useState(DemoQuestions)

  return (
    <div>
      <button>Practice Mode</button>
      {questions.map((question) => { 
        return <QuestionPreview question={question as Question}/>
      })}
    </div>
  );
}

export default App;
