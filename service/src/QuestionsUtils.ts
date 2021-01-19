import IQuestion from './types/IQuestion';

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

const sortIncorrect = (a: IQuestion, b:IQuestion): number => {
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

  const sortUnanswered = (a: IQuestion, b:IQuestion): number => {
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

const sortCorrect = (a: IQuestion, b:IQuestion): number => {
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

export { difficultyVal, sortIncorrect, sortUnanswered, sortCorrect }