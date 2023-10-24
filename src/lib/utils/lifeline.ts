import {
	LifelineDefinitions,
	LifelineName,
} from "$lib/constants/lifeline.constants";
import { Mode } from "$lib/constants/mode.constants";
import type ChoiceInterface from "$lib/interfaces/choice.interface";
import type LifelineInterface from "$lib/interfaces/lifeline.interface";
import { piglatin } from "./piglatin";
import { getRandomNumberBetween, shuffleArray } from "./utils";
const {
	FIFTY_FIFTY,
	ASK_THE_AUDIENCE,
	SWITCH_QUESTION,
	UNPIGLATINIZED,
	ASK_THE_PIG,
} = LifelineName;


export const useAskThePig = (correctAnswer: string): string => {
	return piglatin(correctAnswer);
}


export const useFiftyFifty = (choices: ChoiceInterface[]): ChoiceInterface[] => {
	console.log("current option inside useFiftyFifty: ", choices)

    const correctChoiceIndex: number = choices.findIndex(choice => choice.isCorrect);
    let incorrectChoiceIndexes: number[] = [];
	
	choices.forEach((choice, index) => {
        if(!choice.isCorrect)
			incorrectChoiceIndexes = [...incorrectChoiceIndexes, index];
    });

    const randomIncorrectChoiceIndex: number = shuffleArray(incorrectChoiceIndexes)[0];
    return choices.map((choice, index) => {
        if(index !== correctChoiceIndex && index !== randomIncorrectChoiceIndex)
			return {...choice, disabled: true, invisible: true};
        return {...choice, disabled: false, invisible: false};
    })
};



export const useAskTheAudience = (choices: ChoiceInterface[]): ChoiceInterface[] => {
	const additionalPoints = 15;
	let totalPoints = 0;
	console.log("using ask the audience...");
	choices = choices.map((choice) => {
		let audienceVote = 0;

		if(choice.disabled) 
			return choice;

		if(choice.isCorrect) 
			audienceVote = additionalPoints + getRandomNumberBetween(0, 45)
		else 
			audienceVote = getRandomNumberBetween(0, 45)

		totalPoints += audienceVote;
		return {...choice, audience_vote: audienceVote};
	});

	choices = choices.map((choice) => {
		if(choice.disabled)
			return choice;

		if (choice.audience_vote !== undefined)
			return {...choice, audience_vote: (choice.audience_vote / totalPoints) * 100}
		
		return choice;
	});

	return choices;
};


const getLifelineDefinitions = (lifelines: LifelineName[]): LifelineInterface[] => {
	return lifelines.map((lifeline: LifelineName) => {
		return LifelineDefinitions.find(
			(lifelineDefinition) => lifelineDefinition.type === lifeline
		);
	}).filter((lifelineDefinition): lifelineDefinition is LifelineInterface => {
		return lifelineDefinition !== undefined;
	});
}

export const getLifelines = (mode: Mode): LifelineInterface[] => {
    let lifelines = [
		FIFTY_FIFTY,
		ASK_THE_AUDIENCE,
		SWITCH_QUESTION,
		ASK_THE_PIG,
	];

	if (mode === Mode.PIGLATIN) {
		lifelines = [
			FIFTY_FIFTY,
			ASK_THE_AUDIENCE,
			SWITCH_QUESTION,
			UNPIGLATINIZED,
		];	
	}
    return getLifelineDefinitions(lifelines);
};
