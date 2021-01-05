import express from 'express'
import parser from 'body-parser'

const app: express.Application = express()
app.use(parser.json())

// get questions
app.get('/questions', (req, res) => { 
  res.send('Hello world!')
})

// answer question
app.post('/question', (req, res) => {
  req.body
})

app.listen(4000)