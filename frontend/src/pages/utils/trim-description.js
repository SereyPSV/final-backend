export const trimDescription = (str, numSymbols) => {
	if (str.length > numSymbols) {
		const strArray = str.slice(0, numSymbols).split(' ');
		strArray.pop();
		return `${strArray.join(' ')} ...`;
	}
	return str;
};
