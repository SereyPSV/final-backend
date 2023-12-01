export const deleteUser = (userId) =>
	fetch(`http://localhost:3030/users/${userId}`, {
		method: 'DELETE',
	});
