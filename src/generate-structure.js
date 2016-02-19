import { removePixelValues } from './util/helpers';
import * as regex from './util/regexs';

const groupSelectors = (arr) => {
	return arr.reduce((prev, current) => {
		current = regex.stripWhitespace(current);

		let lastArray = prev[prev.length - 1];

		if (regex.isSelector(current)) prev.push([current]);
		else if (!regex.isEmpty(current)) lastArray.push(current);

		return prev;
	}, []);
}

const recursiveFn = (selector, propertiesIndex, groupStrs) => {
	const propertiesStr = groupStrs[propertiesIndex];

	const setPropertiesObj = ([key, value]) => {
		let propValue  = value;
		const selector = regex.isSelector(key);

		const isPixels = regex.isPixelValue(value);
		if (isPixels) propValue = removePixelValues(value);

		const isNumber = !isNaN(propValue);
		if (isNumber) propValue = Number(propValue);

		return {
			key: !selector ? regex.snakeToCamel(key) : null,
			value: !selector ? propValue : recursiveFn(regex.getWord(key), propertiesIndex + 1, groupStrs)
		};
	};

	const properties = propertiesStr.split(';').reduce((prev, current) => {
		if(regex.isEmpty(current)) return prev;

		const keyValuePairs = current.split(':').map(regex.stripWhitespace);
		prev.push(setPropertiesObj(keyValuePairs));

		return prev;
	}, []);

	return {
		name: regex.getWord(selector),
		properties
	};

}

const generateStructure = (cssStr) => {
	const lines = cssStr.split(/[{-}]/g)
	const groups = groupSelectors(lines);

	return groups.map((group, i) => recursiveFn(group[0], 1, group));
}

export default generateStructure;
