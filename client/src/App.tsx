import React from 'react'
import { QuestionPreview, IQuestion } from './components/QuestionPreview'
import { DemoQuestions } from './mockData/DemoQuestions'

function App() {
  const [questions, setQuestions] = React.useState(DemoQuestions)

  return (
    <div>
      <button>Practice Mode</button>
      {questions.map((question) => { 
        return <QuestionPreview question={question as IQuestion}/>
      })}
    </div>
  );
}

export default App;
