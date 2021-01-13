import express from 'express'
import parser from 'body-parser'
import QuestionProvider from './QuestionsProvider'
import { resolveTripleslashReference } from 'typescript'

const app: express.Application = express()
app.use(parser.json())

// Dependencies
const questionsProvider = new QuestionProvider();

// get questions
app.get('/questions', async (req, res) => { 
  const questions = await questionsProvider.getQuestionSet();
  res.status(200);
  res.json(questions);
  res.end();
})

// answer question
app.post('/question/:id', (req, res) => {
  try {
    const answer = questionsProvider.answerQuestion(req.params.id, req.body.json());
    res.status(200);
    res.json({ result: answer });
  } catch {
    res.status(400);
  }
  res.end();
})

app.listen(4000)