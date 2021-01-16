import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env") });

import mongoose, { model, Model, Document, Schema } from "mongoose";
import axios from "axios";
import { isImportEqualsDeclaration } from "typescript";

interface Trivia {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [string];
}

// workitem create subdocument relationship?
interface IQuestion extends Document {
  _id?: number;
  trivia: Trivia;
  num_attempts: number;
  answered_correctly: boolean;
}

const questionSchema: Schema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  trivia: {
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    correct_answer: {
      type: String,
      required: true,
    },
    incorrect_answers: {
      type: [String],
      required: true,
    }
  },
  num_attempts: {
    type: Number,
    required: true
  },
  answered_correctly: {
    type: Boolean,
    required: true
  }
});

export interface AnswerResponse {
  question: IQuestion,
  result: string
}

const QuestionModel = model<IQuestion>("Question", questionSchema);

const password = process.env.MONGODB_PASSWORD ?? "";
const connectionString = `mongodb+srv://jonas:${password}@cluster0.49ssl.mongodb.net/emerald?retryWrites=true&w=majority`;

class QuestionsProvider {
  private sessionToken: string | null = null;
  // workitem store connection object?

  constructor() {} // workitem do i need a constructor if it is empty?

  async startQuestionSet(): Promise<IQuestion[]> {
    const sessionTokenResponse = await axios.get(
      "https://opentdb.com/api_token.php?command=request"
    );
    this.sessionToken = sessionTokenResponse.data.token;

    // workitem refactor connection logic
    await mongoose
      .connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .catch((err) => console.log(err));
    
    await QuestionModel.deleteMany({});

    const triviaApiUrl = `https://opentdb.com/api.php?amount=15&category=18&token=${this.sessionToken}`;

    const questionResponse = await axios.get(triviaApiUrl);
    const questions: IQuestion[] = questionResponse.data.results.map(
      (question: Trivia, index: number): IQuestion => {
        let newQuestion = {
          _id: index,
          answered_correctly: false,
          num_attempts: 0,
          trivia: question
        };
        return newQuestion as IQuestion;
      });
    
    questions.map(async (question: IQuestion) => {
      await QuestionModel.create(question).catch((err) => {
        console.log(err);
      });
    });

    return questions;
  }

  getQuestionsOrdered() {
    
  }

  async answerQuestion(question_id: string, answer: string): Promise<AnswerResponse> {
    await mongoose
      .connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .catch((err) => console.log(err));

    const question = await QuestionModel.findById(question_id).exec() as IQuestion;

    if (question.trivia.correct_answer === answer) {
      await QuestionModel.findByIdAndUpdate(question_id, { answered_correctly: true })
      .then((doc) => {console.log(doc)})
      .catch((err) => {console.log(err)});
    }
    else {
      await QuestionModel.findByIdAndUpdate(question_id, { num_attempts: question.num_attempts + 1 })
      .then((doc) => {console.log(doc)})
      .catch((err) => {console.log(err)});
    }

    const answerResponse = {
      question: question,
      result: question.trivia.correct_answer === answer ? "correct" : "incorrect"
    }
    
    return answerResponse;
  }
}

export default QuestionsProvider;
