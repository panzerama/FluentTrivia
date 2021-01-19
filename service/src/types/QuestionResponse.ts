type AnswerOption = {
    description: string
    correct: boolean
}

type QuestionResponse = {
    id: number
    category: string
    type: string
    difficulty: string
    question: string
    answers: AnswerOption[]
}

export { QuestionResponse, AnswerOption };