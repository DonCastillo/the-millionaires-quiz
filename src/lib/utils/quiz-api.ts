import type { CategoryName } from "$lib/constants/category.constants";
import type { Difficulty } from "$lib/constants/difficulty.constants";
import { getCategoryIcon, getDifficultyLevel, stringToCategoryName } from "./type";
import { error } from "@sveltejs/kit";
import axios from "axios";
import { shuffleArray } from "./utils";
import type QuestionInterface from "$lib/interfaces/question.interface";
import type CategoryInterface from "$lib/interfaces/category.interface";

const BASE_ENDPOINT = "https://opentdb.com/";

/** 
 * Returns a unique token to ensure quiz questions returned are not duplicated
 */
export const getToken = async () => {
    return new Promise<string>(async (resolve, reject) => {
        console.log("getting token ...");
        await axios.get(`${BASE_ENDPOINT}/api_token.php?command=request`)
            .then((response) => {
                if(response.status !== 200) throw new Error();
                if(response.data.response_code !== 0) throw new Error();
                if(response.data.token === "") throw new Error();
                resolve(response.data.token);
            })
            .catch((error) => reject(new Error("Cannot retrieve token.")))
    })
}

/** Deletes the token. Called after the game is over */
export const deleteToken = async (token: string | null) => {
    return new Promise<boolean>(async (resolve, reject) => {
        console.log("deleting token ...");
        if(!token) reject(new Error("Invalid token"));
        await axios.get(`${BASE_ENDPOINT}/api_token.php?command=reset&token=${token}`)
            .then((response) => {
                if(response.status !== 200) throw new Error();
                if(response.data.response_code !== 0) throw new Error();
                resolve(true);
            })
            .catch((error) => reject(new Error("Cannot delete token.")))
    });
}

/** Returns a complete list of question categories */
export const getCategories = async (token: string | null) => {
    return new Promise<CategoryInterface[]>(async (resolve, reject) => {
        console.log("retrieving categories ...");
        if(!token) reject(new Error("Invalid token"));
        await axios.get(`${BASE_ENDPOINT}/api_category.php?token=${token}`)
            .then((response) => {
                if(response.status !== 200) throw new Error();
                if(response.data.trivia_categories.length === 0) throw new Error();
                const categories = response.data.trivia_categories.map((category: any) => {
                    const categoryName = stringToCategoryName(category.name);
                    return {
                        name: categoryName,
                        icon: getCategoryIcon(categoryName),
                    }
                });
                resolve(categories);
            })
            .catch((error) => reject(new Error("Cannot retrieve categories.")))

    });
}

/** Retrieve a random list of questions */
export const getQuestions = async (token: string | null, amount: number, difficulty: Difficulty) => {
    return new Promise<QuestionInterface[]>(async (resolve, reject) => {
        console.log("retrieving questions ...");
        if(!token) reject(new Error("Invalid token"));
        await axios.get(`${BASE_ENDPOINT}/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&token=${token}`)
            .then((response) => {
                if(response.status !== 200) throw new Error();
                if(response.data.response_code !== 0) throw new Error();
                if(response.data.results.length === 0) throw new Error();
                const questions = response.data.results.map((question: any) => {

                    const shuffledChoices = shuffleArray([...question.incorrect_answers, question.correct_answer]);
                    const choices = shuffledChoices.map((choice: string) => { return { label: choice, isCorrect: choice === question.correct_answer } })
                    return {
                        category: stringToCategoryName(question.category),
                        difficulty: getDifficultyLevel(question.difficulty),
                        question: question.question,
                        choices: choices,
                    }
                });
                resolve(questions);
            })
            .catch((error) => reject(new Error("Cannot retrieve questions.")))
    })
}