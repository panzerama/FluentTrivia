import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env") });

import mongoose, { model, Document, Schema } from "mongoose";
import axios from "axios";
import { isImportEqualsDeclaration } from "typescript";
import { create } from "domain";

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
  correct_attempts: number;
  incorrect_attempts: number;
  last_answer_correct: boolean | null;
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
  correct_attempts: {
    type: Number,
    required: true
  },
  incorrect_attempts: {
    type: Number,
    required: true
  },
  last_answer_correct: {
    type: Boolean,
    required: false
  }
});

// workitem move types into a separate file
export interface AnswerResponse {
  question: IQuestion,
  result: string
}

export type QuestionResponse = {
  id: number;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [string];
}

const QuestionModel = model<IQuestion>("Question", questionSchema);

const password = process.env.MONGODB_PASSWORD ?? "";
const connectionString = `mongodb+srv://jonas:${password}@cluster0.49ssl.mongodb.net/emerald?retryWrites=true&w=majority`;

class QuestionsProvider {
  private sessionToken: string | null = null;
  // workitem store connection object?

  constructor() { } // workitem do i need a constructor if it is empty?

  createQuestionResponse(from: IQuestion[]): QuestionResponse[] {
    const questionResponses: QuestionResponse[] = from.map((question: IQuestion): QuestionResponse => {
      const questionResponse: QuestionResponse = {
        id: question._id ?? -100,
        category: question.trivia.category,
        type: question.trivia.type,
        difficulty: question.trivia.difficulty,
        question: question.trivia.question,
        correct_answer: question.trivia.correct_answer,
        incorrect_answers: question.trivia.incorrect_answers
      }

      return questionResponse;
    })

    return questionResponses;
  }

  async startQuestionSet(): Promise<QuestionResponse[]> {
    const sessionTokenResponse = await axios.get(
      "https://opentdb.com/api_token.php?command=request"
    );
    this.sessionToken = sessionTokenResponse.data.token;

    // workitem refactor connection logic into db client?
    await mongoose
      .connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      })
      .catch((err) => console.log(err));

    await QuestionModel.deleteMany({});

    const triviaApiUrl = `https://opentdb.com/api.php?amount=15&category=18&token=${this.sessionToken}`;
    // workitem if response_code from api response is 4, end of question has been reached for this token

    const questionResponse = await axios.get(triviaApiUrl);
    const questions: IQuestion[] = questionResponse.data.results.map(
      (question: Trivia, index: number): IQuestion => {
        let newQuestion = {
          _id: index,
          last_answer_correct: null,
          correct_attempts: 0,
          incorrect_attempts: 0,
          trivia: question
        };
        return newQuestion as IQuestion;
      });

    questions.map(async (question: IQuestion) => {
      await QuestionModel.create(question).catch((err) => {
        console.log(err);
      });
    });

    const questionResponses = this.createQuestionResponse(questions);

    return questionResponses;
  }

  async getQuestionsOrdered(): Promise<QuestionResponse[]> {
    await mongoose
      .connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      })
      .catch((err) => console.log(err));

      // workitem separate out helper funcs
    const difficultyVal = (diff: string): number => {
      switch (diff) {
        case 'hard': { 
          return 3; 
          break;
        }
        case 'medium': {
          return 2;
          break;
        }
        case 'easy': {
          return 1;
          break;
        }
        default: {
          return -1;
          break;
        }
      }
    }

    const incorrect: IQuestion[] = await QuestionModel.find({ last_answer_correct: false });
    const sortedIncorrect = incorrect.sort((a: IQuestion, b:IQuestion): number => {
      if (a.incorrect_attempts > b.incorrect_attempts) {
        return -1;
      }
      else if (a.incorrect_attempts < b.incorrect_attempts) {
        return 1;
      }
      else {
        const aDiff = difficultyVal(a.trivia.difficulty);
        const bDiff = difficultyVal(b.trivia.difficulty);
        if (aDiff > bDiff) {
          return -1;
        }
        else if (aDiff < bDiff) {
          return 1;
        }
        else {
          return 0;
        }
      }
    });

    const unanswered: IQuestion[] = await QuestionModel.find({ last_answer_correct: null });
    const sortedUnanswered = unanswered.sort((a: IQuestion, b:IQuestion): number => {
        const aDiff = difficultyVal(a.trivia.difficulty);
        const bDiff = difficultyVal(b.trivia.difficulty);
        if (aDiff > bDiff) {
          return 1;
        }
        else if (aDiff < bDiff) {
          return -1;
        }
        else {
          return 0;
        }
    });

    const correct: IQuestion[] = await QuestionModel.find({ last_answer_correct: true });
    const sortedCorrect: IQuestion[] = correct.sort((a: IQuestion, b:IQuestion): number => {
      if (a.correct_attempts > b.correct_attempts) {
        return 1;
      }
      else if (a.correct_attempts < b.correct_attempts) {
        return -1;
      }
      else {
        const aDiff = difficultyVal(a.trivia.difficulty);
        const bDiff = difficultyVal(b.trivia.difficulty);
        if (aDiff > bDiff) {
          return -1;
        }
        else if (aDiff < bDiff) {
          return 1;
        }
        else {
          return 0;
        }
      }
    });

    const questions = sortedIncorrect.concat(sortedUnanswered, sortedCorrect);
    const questionResponses = this.createQuestionResponse(questions);

    return questionResponses;
  }

  // workitem do I actually want to send back the response or just a yes/no success or failure
  async answerQuestion(question_id: string, answer: string): Promise<AnswerResponse> {
    await mongoose
      .connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      })
      .catch((err) => console.log(err));

    let question = await QuestionModel.findById(question_id).exec() as IQuestion;

    if (question.trivia.correct_answer === answer) {
      await QuestionModel.findByIdAndUpdate(question_id, { last_answer_correct: true, correct_attempts: question.correct_attempts + 1 })
        .then((doc) => {
          console.log(doc);
        })
        .catch((err) => { console.log(err) });
    }
    else {
      await QuestionModel.findByIdAndUpdate(question_id, { last_answer_correct: false, incorrect_attempts: question.incorrect_attempts + 1 })
        .then((doc) => {
          console.log(doc);
        })
        .catch((err) => { console.log(err) });
    }

    question = await QuestionModel.findById(question_id).exec() as IQuestion;

    const answerResponse = {
      question: question,
      result: question.trivia.correct_answer === answer ? "correct" : "incorrect"
    }

    return answerResponse;
  }
}

export default QuestionsProvider;
