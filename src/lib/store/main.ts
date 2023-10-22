import { Mode } from "$lib/constants/mode.constants";
import type QuestionInterface from "$lib/interfaces/question.interface";
import { writable, readable } from "svelte/store";

// access token is needed to ensure that the questions returned are not duplicated
export const access_token = writable<string | null>(null);

// name of the user playing the game
export const user_name = writable<string | null>("");

// current cash prize of the user
export const user_cash_prize = writable<number>(0);

// current question mode, defaulted to normal mode
export const question_mode = writable<Mode.NORMAL | Mode.PIGLATIN | null>(Mode.NORMAL);

export const money_prices = writable<number[]>([]);
export const number_of_questions = readable<number>(15); // must be divisible by 3
export const won_jackpot = writable<boolean>(false);

export const easy_questions = writable<QuestionInterface[]>([]);
export const medium_questions = writable<QuestionInterface[]>([]);
export const hard_questions = writable<QuestionInterface[]>([]);