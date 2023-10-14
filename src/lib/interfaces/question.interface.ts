import type { CategoryName } from "$lib/constants/category.constants";
import type { Difficulty } from "$lib/constants/difficulty.constants";

export default interface QuestionInterface {
    category: CategoryName,
    difficulty: Difficulty,
    question: string,
    choices: string[],
    correctAnswer: string,
}