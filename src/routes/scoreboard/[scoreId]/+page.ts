
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		scoreId: params.scoreId,
	};
}