import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env") });

import mongoose from "mongoose";
import axios from "axios";

interface IQuestion extends mongoose.Document {
  question_id?: string;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [string];
}

const questionSchema = new mongoose.Schema({
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
  },
});

const QuestionModel = mongoose.model("Question", questionSchema);

const password = process.env.MONGODB_PASSWORD ?? "";
const connectionString = `mongodb+srv://jonas:${password}@cluster0.49ssl.mongodb.net/emerald?retryWrites=true&w=majority`;

/*
 * We only ever need to store 15 q's in the database!
 */

class QuestionsProvider {
  private sessionToken: string | null = null;

  constructor() {}

  async getQuestionSet(): Promise<IQuestion[]> {
    if (!this.sessionToken) {
      const sessionTokenResponse = await axios.get(
        "https://opentdb.com/api_token.php?command=request"
      );
      this.sessionToken = sessionTokenResponse.data.token;
    }

    await mongoose
      .connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .catch((err) => console.log(err));

    const triviaApiUrl = `https://opentdb.com/api.php?amount=15&category=18&token=${this.sessionToken}`;

    const questionResponse = await axios.get(triviaApiUrl);
    const questions = questionResponse.data.results.map((question: IQuestion, index: Number) => {
      question.question_id = `${index}`;
      return question;
    });

    questions.forEach(async (question: IQuestion) => {
      await QuestionModel.create(question);
    });

    return questions;
  }
}

export default QuestionsProvider;
