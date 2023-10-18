
/** @type {import('./$types').PageLoad} */
export function load({ params, url }) {
	return {
		baseURL: url.origin,
	};
}
