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
        description: "Use this to remove two wrong answers from the options, giving you 50% chance of answering the question correctly.",
        disabled: false,
	},
    {
		name: "Ask the Audience",
        type: LifelineName.ASK_THE_AUDIENCE,
        icon: "fa-people-group",
        description: "Ask the audience for their opinion. The audience ratings will be shown to you. It is not guarantee though that the highest rated answer is the correct one since the audience can make mistake.",
        disabled: false,
	},
    {
		name: "Switch Question",
        type: LifelineName.SWITCH_QUESTION,
        icon: "fa-repeat",
        description: "Switch the current question with a new one.",
        disabled: false
	},
    {
		name: "Unpiglatinized",
        type: LifelineName.UNPIGLATINIZED,
        icon: "fa-language",
        description: "Translate the question and choices back to English.",
        disabled: false
	},
    {
		name: "Ask the Pig",
        type: LifelineName.ASK_THE_PIG,
        icon: "fa-piggy-bank",
        description: "The pig will give you the correct answer but in pig latin form. It is up to you to decipher it.",
        disabled: false
	},
];
