require('dotenv').config()

import mongoose from 'mongoose'
import axios from 'axios'

interface IQuestion {
  category : string
  type : string
  difficulty : string
  question : string
  correct_answer : string
  incorrect_answers : [string]
}

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  difficulty : {
    type: String,
    required: true
  },
  question : {
    type: String,
    required: true
  },
  correct_answer : {
    type: String,
    required: true
  },
  incorrect_answers : {
    type: [String],
    required: true
  }
})

const QuestionModel = mongoose.model('Question', questionSchema)

// public connect to database

// public get a number of questions

const password = process.env.MONGODB_PASSWORD ?? ""
console.log('password loaded as ' + password)
const connectionString = `mongodb+srv://jonas:${password}@cluster0.49ssl.mongodb.net/fluent_trivia?retryWrites=true&w=majority`

mongoose.connect(connectionString).then(() => populateQuestions())

const triviaApiUrl = 'https://opentdb.com/api.php?amount=10'
const populateQuestions = () => {
  const triviaQuestions = axios.get(triviaApiUrl).then((response) => {
    console.log(response.data)
  })
}

const makeQuestion = (from: IQuestion) => {
  return new QuestionModel(from)
}

