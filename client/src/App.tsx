import React from "react";
import { Header } from "./components/Header";
import { QuestionPreview } from "./components/QuestionPreview";
import { QuestionDisplay } from "./components/QuestionDisplay";
import { Question } from "./components/Question";
import { DemoQuestions } from "./mockData/DemoQuestions";

function App() {
  const [questions, setQuestions] = React.useState(DemoQuestions);
  const [currentQuestion, setCurrentQuestion] = React.useState<Question>();

  const questionDisplay = currentQuestion ? (
    <QuestionDisplay question={currentQuestion} />
  ) : (
    ""
  );

  return (
    <div className="container">
      <Header />
      <div>
        <button>Practice Mode</button>
        {questionDisplay}
        {questions.map((question) => {
          return (
            <QuestionPreview
              question={question as Question}
              questionSelectionHandler={setCurrentQuestion}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
