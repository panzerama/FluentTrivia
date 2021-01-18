import React from 'react';
import { Button, ListItem } from '@material-ui/core';

import { Answer } from '../types/Answer';

type AnswerOptionProps = {
    answer: Answer,
    answerHandler: (answer: Answer) => void,
    wasAnswered: boolean
}

export const AnswerOption = ({ answer, answerHandler, wasAnswered }: AnswerOptionProps) => {
    return (
        <ListItem key={answer.description}>
            <Button onClick={() => answerHandler(answer)} disabled={wasAnswered} variant="contained">{answer.description}</Button>
        </ListItem>
    )
}