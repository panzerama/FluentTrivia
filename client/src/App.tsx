import React from "react";
import Header from './components/Header'
import { QuestionPreview } from "./components/QuestionPreview";
import { QuestionDisplay } from "./components/QuestionDisplay";
import { Question } from "./components/Question";
import { DemoQuestions } from "./mockData/DemoQuestions";


// colors
// purple: 54577c
// dark green: 9aa899
// light green: ecffb0
// light yellow: faffd8

function App() {
  const [questions, setQuestions] = React.useState(DemoQuestions);
  const [currentQuestion, setCurrentQuestion] = React.useState<Question>();

  const questionDisplay = currentQuestion ? (
    <QuestionDisplay question={currentQuestion} />
  ) : (
      ""
    );

  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
