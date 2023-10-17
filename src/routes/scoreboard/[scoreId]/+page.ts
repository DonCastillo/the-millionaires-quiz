import axios from "axios";

/** @type {import('./$types').PageLoad} */
export function load({ params, url }) {

	const getScore = async () => {
		return axios.get(url.origin + "/api/scores/" + params.scoreId).then((res) => res.data.data);
	};

	const getAllScores = async () => {
		return axios.get(url.origin + "/api/scores").then((res) => res.data.data);
	};

	return {
		userScore: getScore(),
		getAllScores: getAllScores(),
	};
}
