import axios from "axios";

/** @type {import('./$types').PageLoad} */
export function load({ params, url }) {

	return {
		scoreId: params.scoreId,
	};
}
