import axios from "axios";

/** @type {import('./$types').PageLoad} */
export function load({ params, url }) {

	const getAllScores = async () => {
		return axios.get(url.origin + "/api/scores").then((res) => res.data.data);
	};

	return {
		getAllScores: getAllScores(),
	};
}
