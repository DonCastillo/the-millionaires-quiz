import type QuestionInterface from "$lib/interfaces/question.interface";
import PigLatin from "pig-latinizer"

export const piglatin = (word: string): string => {
    const piglatinWord: PigLatin = new PigLatin();
    return piglatinWord.translate(word);
}

export const piglatinizeQuestions = (questions: QuestionInterface[]): QuestionInterface[] => {
    return questions.map((question: QuestionInterface) => {
        return {
            ...question,
            question: piglatin(question.question),
            choices: question.choices.map((choice: string) => piglatin(choice)),
            correctAnswer: piglatin(question.correctAnswer)
        }
    })
}