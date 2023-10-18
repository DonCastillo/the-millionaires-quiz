export enum LifelineName {
	FIFTY_FIFTY = "fifty-fifty",
	ASK_THE_AUDIENCE = "ask-the-audience",
	SWITCH_QUESTION = "switch-question",
}

export const LifelineLists = [
	{
		name: "50/50",
        type: LifelineName.FIFTY_FIFTY,
        icon: "fa-circle-half-stroke",
        description: "Removes two wrong answers.",
        used: false,
	},
    {
		name: "Ask the Audience",
        type: LifelineName.ASK_THE_AUDIENCE,
        icon: "fa-people-group",
        description: "Ask the audience for their opinion.",
        used: false,
	},
    {
		name: "Switch Question",
        type: LifelineName.SWITCH_QUESTION,
        icon: "fa-repeat",
        description: "Switch the current question with a new one.",
        used: false
	},
];
