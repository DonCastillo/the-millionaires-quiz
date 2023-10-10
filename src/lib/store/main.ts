import { writable, readable } from "svelte/store";

export const ACCESS_TOKEN = writable("");
export const USER_NAME = writable("");
export const USER_CASH_PRIZE = writable(1000);