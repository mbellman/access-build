#!usr/bin/env node

var fs = require('fs');

/**
 * is_directory( file )
 *
 * Determines whether or not a file path is a directory
 * @param {file} [String] : The file path
 * @returns [Boolean]
 * @private
 */
function is_directory (file) {
	return fs.statSync(file).isDirectory();
}

/**
 * getAllFiles( directory )
 *
 * Recursively returns a list of all files within a directory and its subdirectories
 * @param {directory} [String] : The directory path
 * @returns [Array<String>]
 * @export
 */
function getAllFiles (directory) {
	var list = [];
	var files = fs.readdirSync(directory);

	for (var i = 0 ; i < files.length ; i++) {
		var file = directory + '/' + files[i];

		if (is_directory(file)) {
			list = list.concat(getAllFiles(file));
		} else {
			list.push(file);
		}
	}

	return list;
}

module.exports = getAllFiles;