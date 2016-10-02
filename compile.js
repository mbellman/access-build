#!/usr/bin/env node

var A = require('./A.js');
var File = require('./File.js');
var Errors = require('./Errors.js');

// @private [Array<String>] : A list of all files in the program's source directory
var file_list;

/**
 * convert_flags( flags )
 *
 * Returns an object containing semantic flags based on an array of flag strings from the process arguments
 * @param {flags} [Array<String>] : The flags array
 * @returns [Object{Boolean}]
 * @private
 */
function convert_flags (flags) {
	return {
		// Controls whether each .axs/.access file is compiled to its own equivalent .js file
		MIRROR_MODE: A.containsAny(flags, '-m', '-mirror')
	};
}

/**
 * compile_multiple( source, destination, flags )
 *
 * Compiles multiple files from a source directory to a destination directory or file
 * @param {source} [String] : The source directory supplied via compile()
 * @param {destination} [String] : The destination file or directory supplied via compile()
 * @param {flags} [Object{Boolean}] : The semantic flags object supplied via compile()
 * @private
 */
function compile_multiple (source, destination, flags) {
	file_list = File.scan(source);

	A.eachInArray(file_list, function (file) {
		var mirroredFile = destination + '/' + File.getLowerPath(file, 1);

		if (File.hasExtension(file, 'js')) {
			console.log("Compiling: " + file);

			if (flags.MIRROR_MODE) {
				File.write(mirroredFile, "Hey : - )");
			} else {
				File.append(destination, "Hey : - )\n");
			}
		}
	});
}

/**
 * compile( source, destination, flags )
 *
 * Compiles an Access program contained within a source directory to a target directory
 * @param {source} [String] : The source file or directory containing the Access program source code
 * Optional @param {destination} [String] : The destination file or directory to write the compiled JavaScript code into
 * Optional @param {flags} [Array<String>] : The compilation flags
 * @export
 */
function compile (source, destination, flags) {
	if (A.isUndefined(source)) {
		console.log(Errors.SOURCE_UNDEFINED);
		return;
	}

	flags = convert_flags(flags);
	destination = A.default(destination, 'dist');

	if (File.isDirectoryLike(destination) && !flags.MIRROR_MODE) {
		destination += '/bundle.js';
	}

	if (File.isDirectoryLike(source)) {
		compile_multiple(source, destination, flags);
	}
}

module.exports = compile;