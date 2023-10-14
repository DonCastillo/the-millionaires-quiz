import { writable, readable } from "svelte/store";

export const access_token = writable<string | null>(null);
export const user_name = writable<string | null>("");
export const user_cash_prize = writable<string | number>(0);

export const easy_questions = writable<string[]>([]);
export const medium_questions = writable<string[]>([]);
export const hard_questions = writable<string[]>([]);