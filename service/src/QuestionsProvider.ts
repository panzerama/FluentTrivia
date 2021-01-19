import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env") });

import mongoose, { model, Schema } from "mongoose";
import axios from "axios";
import { isImportEqualsDeclaration } from "typescript";
import { create } from "domain";

import Trivia from './types/Trivia';
import IQuestion from './types/IQuestion';
import AnswerResponse from './types/AnswerResponse';
import QuestionResponse from './types/QuestionResponse';
import { 
  difficultyVal, 
  sortIncorrect, 
  sortUnanswered,
  sortCorrect
} from './QuestionsUtils';

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

const QuestionModel = model<IQuestion>("Question", questionSchema);

class QuestionsProvider {
  private sessionToken: string | null = null;

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
    const incorrect: IQuestion[] = await QuestionModel.find({ last_answer_correct: false });
    const sortedIncorrect = incorrect.sort(sortIncorrect);

    const unanswered: IQuestion[] = await QuestionModel.find({ last_answer_correct: null });
    const sortedUnanswered = unanswered.sort(sortUnanswered);

    const correct: IQuestion[] = await QuestionModel.find({ last_answer_correct: true });
    const sortedCorrect: IQuestion[] = correct.sort(sortCorrect);

    const questions = sortedIncorrect.concat(sortedUnanswered, sortedCorrect);
    const questionResponses = this.createQuestionResponse(questions);

    return questionResponses;
  }

  async answerQuestion(question_id: string, answer: string): Promise<AnswerResponse> {
    let question = await QuestionModel.findById(question_id).exec() as IQuestion;

    if (question.trivia.correct_answer === answer) {
      await QuestionModel.findByIdAndUpdate(question_id, { last_answer_correct: true, correct_attempts: question.correct_attempts + 1 })
        .catch((err) => { console.log(err) });
    }
    else {
      await QuestionModel.findByIdAndUpdate(question_id, { last_answer_correct: false, incorrect_attempts: question.incorrect_attempts + 1 })
        .catch((err) => { console.log(err) });
    }

    const answerResponse = {
      result: question.trivia.correct_answer === answer ? "correct" : "incorrect"
    }

    return answerResponse;
  }
}

export default QuestionsProvider;
