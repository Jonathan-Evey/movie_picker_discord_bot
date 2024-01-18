const formatTitle = (string) => {
	let lowerCaseString = string.toLowerCase().trim();
	let stringAsArray = lowerCaseString.split("");
	let newArray = [];
	stringAsArray.forEach((letter, index) => {
		if (index === 0) {
			newArray.push(letter.toUpperCase());
		} else if (stringAsArray[index - 1] === " ") {
			newArray.push(letter.toUpperCase());
		} else {
			newArray.push(letter);
		}
	});
	return newArray.join("");
};

module.exports = { formatTitle };
