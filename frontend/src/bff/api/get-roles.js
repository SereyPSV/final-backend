export const getRoles = () =>
fetch('http://localhost:3030/roles').then((loadedRoles) => loadedRoles.json());
