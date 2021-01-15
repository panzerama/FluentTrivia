import express from 'express'
import parser from 'body-parser'
import QuestionProvider from './QuestionsProvider'
import { resolveTripleslashReference } from 'typescript'

const app: express.Application = express()
app.use(parser.json())

// Dependencies
const questionsProvider = new QuestionProvider();

// start new session
app.get('/start', async (req, res) => {
  const questions = await questionsProvider.startQuestionSet();
  res.status(200);
  res.json(questions);
  res.end();
});

// get questions
app.get('/questions', (req, res) => {
  res.status(501);
  res.json({ error: "Not implemented" });
  res.end();
});

// answer question
app.post('/question/:id', (req, res, next) => {
  try {
    const answer = questionsProvider.answerQuestion(req.params.id, req.body.json());
    res.status(200);
    res.json({ result: answer });
    res.end();
  } catch (err) {
    next(err)
  }
})

app.listen(4000)