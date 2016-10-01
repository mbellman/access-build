#!usr/bin/env node

/**
 * A
 *
 * Handy utilities
 * @export
 */
var A = {};

/**
 * A.isUndefined( file )
 *
 * Determines whether a value is undefined
 * @param {value} [*] : The value to check
 * @returns [Boolean]
 */
A.isUndefined = function (value) {
	return typeof value === 'undefined';
};

/**
 * A.eachInArray( array, handler )
 *
 * Iterates over an array, invoking a handler function for each element
 * @param {array} [Array<*>] : The array to iterative over
 * @param {handler} [Function( value, index )] : A handler function to run for each iteration
 * @returns [Boolean]
 */
A.eachInArray = function (array, handler) {
	for (var i = 0 ; i < array.length ; i++) {
		if (handler(array[i], i) === false) {
			break;
		}
	}
};

module.exports = A;