// Type Declaration
export type Question = {
  id: string
  category : string
  type : string
  difficulty : string
  question : string
  correct_answer : string
  incorrect_answers : [string]
}