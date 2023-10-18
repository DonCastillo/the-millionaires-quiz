export default interface ChoiceInterface {
    label: string;
    isCorrect: boolean;
    disabled?: boolean;
    invisible?: boolean;
    audience_vote?: number;
}