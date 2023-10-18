export enum LifelineName {
	FIFTY_FIFTY = "fifty-fifty",
	ASK_THE_AUDIENCE = "ask-the-audience",
	PHONE_A_FRIEND = "phone-a-friend",
	SWITCH_QUESTION = "switch-question",
}

export enum LifelineIcon {
	FIFTY_FIFTY = "fa-circle-half-stroke",
	ASK_THE_AUDIENCE = "fa-people-group",
	PHONE_A_FRIEND = "fa-phone",
	SWITCH_QUESTION = "fa-repeat",
}

export const LifelineLists = [
	{
		name: "50/50",
        type: LifelineName.FIFTY_FIFTY,
        icon: "fa-circle-half-stroke",
        description: "Removes two wrong answers.",
	},
    {
		name: "Ask the Audience",
        type: LifelineName.ASK_THE_AUDIENCE,
        icon: "fa-people-group",
        description: "Ask the audience for their opinion.",
	},
    {
		name: "Switch Question",
        type: LifelineName.SWITCH_QUESTION,
        icon: "fa-repeat",
        description: "Switch the current question with a new one.",
	},
];
