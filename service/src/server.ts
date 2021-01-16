import express from 'express'
import parser from 'body-parser'
import QuestionProvider, {AnswerResponse} from './QuestionsProvider'
import { resolveTripleslashReference } from 'typescript'

const app: express.Application = express()
app.use(parser.json())

// Dependencies
const questionsProvider = new QuestionProvider();

// start new session and clear stored questions
app.get('/start', async (req, res) => {
  const questions = await questionsProvider.startQuestionSet();
  res.status(200);
  res.json(questions);
  res.end();
});

// get current question set
app.get('/questions', (req, res) => {
  res.status(501);
  res.json({ error: "Not implemented" });
  res.end();
});

// answer question something
app.post('/question/:id', async (req, res, next) => {
  try {
    const answer: AnswerResponse = await questionsProvider.answerQuestion(req.params.id, req.body.answer);
    res.status(200);
    res.json(JSON.stringify(answer));
    res.end();
  } catch (err) {
    next(err)
  }
})

app.listen(4000)