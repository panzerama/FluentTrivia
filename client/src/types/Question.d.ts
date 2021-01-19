import { Answer } from './Answer';

type Question = {
  id: number
  category : string
  type : string
  difficulty : string
  question : string
  answers: Answer[]
}

export { Question }