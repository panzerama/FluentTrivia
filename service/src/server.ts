import express from 'express'
import parser from 'body-parser'

import QuestionProvider from './QuestionsProvider'
import AnswerResponse from './types/AnswerResponse';
import QuestionResponse from './types/QuestionResponse';

const app: express.Application = express()
app.use(parser.json())

const questionsProvider = new QuestionProvider();

// Disabling CORS in development
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

/** Starts a new set of questions */
app.get('/start', async (req, res, next) => {
  questionsProvider.startQuestionSet()
  .then((questions: QuestionResponse[]): void => {
    res.status(200);
    res.json(questions);
    res.end();
  })
  .catch(err => next(err));
});

/** Gets the current set of questions in appropriate order */
app.get('/questions', async (req, res, next) => {
  questionsProvider.getQuestionsOrdered()
  .then((questions: QuestionResponse[]): void => {
    res.status(200);
    res.json(questions);
    res.end();
  })
  .catch(err => next(err));
});

/** Submit an answer for question with :id */
app.post('/question/:id', async (req, res, next) => {
  questionsProvider.answerQuestion(req.params.id, req.body.answer)
  .then((answer: AnswerResponse) => {
    res.status(200);
    res.json(answer);
    res.end();
  })
  .catch(err => next(err));
})

app.listen(4000);