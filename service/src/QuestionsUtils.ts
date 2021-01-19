import IQuestion from './types/IQuestion';
import { QuestionResponse, AnswerOption } from './types/QuestionResponse';

const difficultyVal = (diff: string): number => {
    switch (diff) {
        case 'hard': {
            return 3;
        }
        case 'medium': {
            return 2;
        }
        case 'easy': {
            return 1;
        }
        default: {
            return -1;
        }
    }
}

const sortIncorrect = (a: IQuestion, b: IQuestion): number => {
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
}

const sortUnanswered = (a: IQuestion, b: IQuestion): number => {
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
}

const sortCorrect = (a: IQuestion, b: IQuestion): number => {
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
}

const randomizeElements = (arr: AnswerOption[]): AnswerOption[] => {
    let randomIndex = Math.floor(Math.random() * Math.floor(arr.length));
    let randomized: AnswerOption[] = [arr[randomIndex]];
    arr.splice(randomIndex, 1);

    while (arr.length > 0) {
        randomIndex = Math.floor(Math.random() * Math.floor(arr.length));
        randomized.push(arr[randomIndex]);
        arr.splice(randomIndex, 1);
    }

    return randomized;
};

const compileAndShuffleAnswers = (question: IQuestion): AnswerOption[] => { 
    let answers: AnswerOption[] = [
      {
        description: question.trivia.correct_answer,
        correct: true,
      },
    ];

    question.trivia.incorrect_answers.forEach((answer) => {
      answers.push({
        description: answer,
        correct: false,
      });
    });

    return randomizeElements(answers);
}

const createQuestionResponse = (from: IQuestion[]): QuestionResponse[] => {
    const questionResponses: QuestionResponse[] = from.map((question: IQuestion): QuestionResponse => {
      const questionResponse: QuestionResponse = {
        id: question._id ?? -100,
        category: question.trivia.category,
        type: question.trivia.type,
        difficulty: question.trivia.difficulty,
        question: question.trivia.question,
        answers: compileAndShuffleAnswers(question),
      }

      return questionResponse;
    })

    return questionResponses;
  }

export { sortIncorrect, sortUnanswered, sortCorrect, createQuestionResponse }