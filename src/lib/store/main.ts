import type QuestionInterface from "$lib/interfaces/question.interface";
import { writable, readable } from "svelte/store";

export const access_token = writable<string | null>(null);
export const user_name = writable<string | null>(null);
export const user_cash_prize = writable<number>(0);

export const easy_questions = writable<QuestionInterface[]>([]);
export const medium_questions = writable<QuestionInterface[]>([]);
export const hard_questions = writable<QuestionInterface[]>([]);