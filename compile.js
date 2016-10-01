#!usr/bin/env node

var getAllFiles = require('./getAllFiles.js');

/**
 * compile( sourceDirectory, targetDirectory )
 *
 * Compiles an Access program contained within a source directory to a target directory
 * @param {sourceDirectory} [String] : The source directory containing the program source code
 * @param {targetDirectory} [String] : The target directory to write the compiled JavaScript code into
 */
function compile (sourceDirectory, targetDirectory) {
	if (
		typeof sourceDirectory === 'undefined' ||
		typeof targetDirectory === 'undefined'
	) {
		console.log('Please specify a source and target directory.');
		return;
	}

	var files = getAllFiles(sourceDirectory);

	console.log(files);
}

// Execution entry point
compile(process.argv[2], process.argv[3]);