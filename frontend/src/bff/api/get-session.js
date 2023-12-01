import { transformSession } from '../transformers';

export const getSession = async (hash) => {
	return fetch(`http://localhost:3030/sessions?hash=${hash}`)
		.then((loadedSession) => loadedSession.json())
		.then(([loadedSession]) => loadedSession && transformSession(loadedSession));
};
