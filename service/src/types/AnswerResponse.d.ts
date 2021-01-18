import IQuestion from './IQuestion';

export default interface AnswerResponse {
    question: IQuestion,
    result: string
}