import { Document } from 'mongoose';
import Trivia from './Trivia';

export default interface IQuestion extends Document {
    _id?: number;
    trivia: Trivia;
    correct_attempts: number;
    incorrect_attempts: number;
    last_answer_correct: boolean | null;
}
