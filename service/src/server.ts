import express from 'express'
import parser from 'body-parser'
import QuestionProvider from './QuestionsProvider'

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
app.post('/question', (req, res) => {
  req.body
})

app.listen(4000)