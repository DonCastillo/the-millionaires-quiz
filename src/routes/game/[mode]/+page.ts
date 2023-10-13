/** @type {import('./$types').PageLoad} */ 
export function load({ params }) {
	return {
        mode: params.mode
	};
}
