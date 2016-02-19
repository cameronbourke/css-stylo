const parseStructure = (styles) => {
	const getStyles = (obj, target) => {
		target[obj.name] = {};
		// keep calling recursivley until there is an obj
		obj.properties.forEach(({ key, value }) =>  {
			if (key === null) {
				getStyles(value, target[obj.name]);
			}

			else {
				target[obj.name][key] = value;
			}
		});

		return target;
	}

	return styles.reduce((prev, current) => {
		// mimic css cascade by merging two or more instances
		// of the same style object
		// if (prev[current.name] !== undefined) {
		// 	current = {
		// 		name: current.name,
		// 		properties: [
		// 			...prev[current.name].properties,
		// 			...current.properties
		// 		]
		// 	};
		// }

		return prev = getStyles(current, prev);
	}, {});

}

export default parseStructure;
