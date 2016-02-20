import generateStructure from './generate-structure';
import parseStructure from './parse-structure';

const stylo = (cssString, parsePixels) => {
	const stylesArray = generateStructure(cssString);
	return parseStructure(stylesArray);
};

export default stylo;
