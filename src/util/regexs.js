export const stripWhitespace = (str) => str.replace(/(^\s+|\s+$)/g,'');

export const isSelector = (str) => /(?:\.|#)/.test(str[0]);

export const split = (char, str) => (str) => str.split(char);

export const getWord = (str) => str.match(/([a-z]|-)+/i)[0];

export const isEmpty = (str) => /^$/g.test(str);

export const isPixelValue = (str) => /\w=?px/g.test(str);

export const snakeToCamel = (s) => s.replace(/(\-\w)/g, (m) => m[1].toUpperCase());
