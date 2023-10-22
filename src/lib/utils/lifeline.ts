import {
	LifelineDefinitions,
	LifelineName,
} from "$lib/constants/lifeline.constants";
import { Mode } from "$lib/constants/mode.constants";
import type ChoiceInterface from "$lib/interfaces/choice.interface";
import type LifelineInterface from "$lib/interfaces/lifeline.interface";
import { get } from "svelte/store";
import { shuffleArray } from "./utils";
const {
	FIFTY_FIFTY,
	ASK_THE_AUDIENCE,
	SWITCH_QUESTION,
	UNPIGLATINIZED,
	ASK_THE_PIG,
} = LifelineName;

export const useFiftyFifty = (choices: ChoiceInterface[]): ChoiceInterface[] => {
    const correctChoiceIndex = choices.findIndex(choice => choice.isCorrect);
    const incorrectChoiceIndexes = choices.map((choice, index) => {
        if(!choice.isCorrect) return index;
    });
    const randomIncorrectChoiceIndex = shuffleArray(incorrectChoiceIndexes)[0];

    return choices.map((choice, index) => {
        if(index !== correctChoiceIndex && index !== randomIncorrectChoiceIndex) {
            return {...choice, disabled: true, invisible: true};
        }
        return choice
    })
};



// export const useAskTheAudience = (choices: ChoiceInterface[]): ChoiceInterface[] => {
//     const correctChoiceIndex = choices.findIndex(choice => choice.isCorrect);
//     const incorrectChoiceIndexes = choices.map((choice, index) => {
//         if(!choice.isCorrect) return index;
//     });
// };


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
