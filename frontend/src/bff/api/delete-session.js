export const deleteSession = async (sessionId) =>
	fetch(`http://localhost:3030/sessions/${sessionId}`, {
		method: 'DELETE',
	});
