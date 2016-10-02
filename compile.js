#!/usr/bin/env node

var A = require('./A.js');
var File = require('./File.js');
var Errors = require('./Errors.js');

// @private [Array<String>] : A list of all files in the program's source directory
var file_list;

/**
 * compile( source, destination )
 *
 * Compiles an Access program contained within a source directory to a target directory
 * @param {source} [String] : The source file or directory containing the Access program source code
 * @param {destination} [String] : The destination file or directory to write the compiled JavaScript code into
 */
function compile (source, destination) {
	if (A.isUndefined(source) || A.isUndefined(destination)) {
		console.log(Errors.SOURCE_OR_DESTINATION_UNDEFINED);
		return;
	}

	destination = 'build/bundle.js';

	file_list = File.scan(source);

	A.eachInArray(file_list, function (file) {
		//var target = destination + '/' + File.getLowerPath(file, 1);

		if (File.hasExtension(file, 'js')) {
			console.log("Compiling: " + file);
			//File.write(target, "Hey : - )");
			File.append(destination, "Hey : - )\n");
		}
	});
}

module.exports = compile;