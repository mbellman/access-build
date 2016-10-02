#!usr/bin/env node

/**
 * A
 *
 * Handy utilities
 * @export
 */
var A = {};

/**
 * A.typeOf()
 *
 * Returns the data type for a value - with the exception of null, which is normalized to 'null' rather than 'object'
 * @param {value} [*] : The value to check
 * @returns [String]
 */
A.typeOf = function (value) {
	if (value !== null) {
		return typeof value;
	}

	return 'null';
};

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
 * A.default( value, default )
 *
 * Returns a default value if a primary value is undefined
 * @param {value} [*] : The value to check
 * @param {fallback} [*] : The default to fall back to
 * @returns [*]
 */
A.default = function (value, fallback) {
	return A.isUndefined(value) ? fallback : value;
};

/**
 * A.argsToArray( args )
 *
 * Returns a normalized array from an arguments list
 * @param {args} [Arguments] : A list of arguments
 * @returns [Array<*>]
 */
A.argsToArray = function (args) {
	return Array.prototype.slice.call(args, 0);
};

/**
 * A.lastInArray( array )
 *
 * Retrieves the last element in an array
 * @param {array} [Array<*>] : The array to retrieve from
 * @returns [*]
 */
A.lastInArray = function (array) {
	return array[array.length - 1];
};

/**
 * A.isInArray( array, value )
 *
 * Determines whether a value is contained within an array
 * @param {array} [Array<*>] : The array to search through
 * @param {value} [*] : The value to search for
 * @returns [Boolean]
 */
A.isInArray = function (array, value) {
	var found = false;

	A.eachInArray(array, function (element) {
		if (element === value) {
			return !(found = true);
		}
	});

	return found;
};

/**
 * A.containsAny( array, ... )
 *
 * Determines whether an arbitrary number of values are contained within an array
 * @param {array} [Array<*>] : The array to search through
 * Optional @param {[arg1, [arg2, ...]]} [*] : The values to search for
 * @returns [Boolean]
 */
A.containsAny = function () {
	var values = A.argsToArray(arguments);
	var array = values.shift();

	var found = false;

	A.eachInArray(array, function (val) {
		if (A.isInArray(values, val)) {
			return !(found = true);
		}
	});

	return found;
};

/**
 * A.has( haystack, needle )
 *
 * Determines whether an array, object, or string contains an element, key, or substring
 * @param {haystack} [Array<*> | Object{*} | String] : The collection or item to search through
 * @param {needle} [* | String] : The value to search for
 */
A.has = function (haystack, needle) {
	switch (A.typeOf(haystack)) {
		case 'array':
			return A.isInArray(haystack, needle);
		case 'object':
			return haystack.hasOwnProperty(needle);
		case 'string':
			return haystack.indexOf(needle) > -1;
	}
};

/**
 * A.eachInArray( array, handler )
 *
 * Iterates over an array, invoking a handler function for each element
 * @param {array} [Array<*>] : The array to iterative over
 * @param {handler} [Function( value, index, array )] : A handler function to run for each iteration
 */
A.eachInArray = function (array, handler) {
	for (var i = 0 ; i < array.length ; i++) {
		if (handler(array[i], i, array) === false) {
			break;
		}
	}
};

module.exports = A;