import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env") });

import mongoose from "mongoose";
import axios from "axios";

interface IQuestion extends mongoose.Document {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [string];
}

/*
 * We only ever need to store 15 q's in the database!
 */

class QuestionsProvider {
  private sessionToken: string | null = null;

  async getQuestionSet(): Promise<IQuestion[]> {
    if (!this.sessionToken) {
      const sessionTokenResponse = await axios.get('https://opentdb.com/api_token.php?command=request');
      this.sessionToken = sessionTokenResponse.data.token;
    }

    const triviaApiUrl = `https://opentdb.com/api.php?amount=15&category=18&token=${this.sessionToken}`;

    const questionResponse = await axios.get(triviaApiUrl);
    const questions: IQuestion[] = questionResponse.data.results;

    return questions
  }
}

export default QuestionsProvider;