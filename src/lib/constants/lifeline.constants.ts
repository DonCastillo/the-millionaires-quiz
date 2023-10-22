import type LifelineInterface from "$lib/interfaces/lifeline.interface";

export enum LifelineName {
	FIFTY_FIFTY = "fifty-fifty",
	ASK_THE_AUDIENCE = "ask-the-audience",
	SWITCH_QUESTION = "switch-question",
    UNPIGLATINIZED = "unpiglatinized",
    ASK_THE_PIG = "ask-the-pig",
}

export const LifelineDefinitions: LifelineInterface[] = [
	{
		name: "50/50",
        type: LifelineName.FIFTY_FIFTY,
        icon: "fa-circle-half-stroke",
        description: "Use this to removes two wrong answers from the options, giving you 50% chance of answering the question correctly.",
        used: false,
	},
    {
		name: "Ask the Audience",
        type: LifelineName.ASK_THE_AUDIENCE,
        icon: "fa-people-group",
        description: "Ask the audience for their opinion. The highest rated answer will be shown to you.",
        used: false,
	},
    {
		name: "Switch Question",
        type: LifelineName.SWITCH_QUESTION,
        icon: "fa-repeat",
        description: "Switch the current question with a new one.",
        used: false
	},
    {
		name: "Unpiglatinized",
        type: LifelineName.UNPIGLATINIZED,
        icon: "fa-language",
        description: "Translate the question and choices back to English.",
        used: false
	},
    {
		name: "Ask the Pig",
        type: LifelineName.ASK_THE_PIG,
        icon: "fa-piggy-bank",
        description: "The pig will give you the correct answer but in pig latin form. It is up to you to decipher it.",
        used: false
	},
];
