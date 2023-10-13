import { writable, readable } from "svelte/store";

export const access_token = writable("");
export const user_name = writable("");
export const user_cash_prize = writable(1000);

export const easy_questions = writable([]);
export const medium_questions = writable([]);
export const hard_questions = writable([]);