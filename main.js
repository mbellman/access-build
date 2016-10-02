#!/usr/bin/env node

var Errors = require('./Errors.js');
var compile = require('./compile.js');

/**
 * Constants
 */
var OPERATION_BUILD = 'build';
var OPERATION_COMPILE = 'compile';

var Flags = {
	'-mirror': 'mirrorMode',
	'-m': 'mirrorMode'
};

/**
 * splice_flags( args )
 *
 * Retrieves all flag-like arguments from the process arguments
 * @param {args} [Array<String>] : The array of process arguments
 * @returns [Array<String>]
 * @private
 */
function splice_flags (args) {
	var flags = [];
	var i = 0;

	while (i < args.length) {
		if (args[i].charAt(0) === '-') {
			flags.push(args.splice(i, 1)[0]);
		} else {
			i++;
		}
	}

	return flags;
}

/**
 * main( args )
 *
 * Collects and analyzes the process arguments before passing the information on to the applicable method
 * @param {args} [Array<*>] : The arguments provided by process.argv
 * @private
 */
function main (args) {
	args.splice(0, 2);

	var operation = args.shift();
	var flags = splice_flags(args);

	switch (operation) {
		case OPERATION_BUILD:
		case OPERATION_COMPILE:
			compile(args[0], args[1], flags);
			break;
		default:
			console.log(Errors.INVALID_OPERATION, operation);
			break;
	}
}

// Program entry point
main(process.argv);