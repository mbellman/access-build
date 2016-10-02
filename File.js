#!/usr/bin/env node

var fs = require('fs');
var A = require('./A.js');
var Errors = require('./Errors.js');

/**
 * Constants
 */
var MODE_WRITE = 'MODE_WRITE';
var MODE_APPEND = 'MODE_APPEND';

/**
 * update_calls
 *
 * A list of function call mappings for update_file()
 * @private
 */
var update_calls = {};

// @private [Function] : The default action for file writes
update_calls[MODE_WRITE] = fs.writeFileSync;
// @private [Function] : The default acton for file appends
update_calls[MODE_APPEND] = fs.appendFileSync;

/**
 * build_directory_path( path )
 *
 * Builds out a directory path where one does not exist in the file system, and returns true/false depending on success
 * @param {path} [String] : The desired directory path, e.g. "src/app/system"
 * @returns [Boolean]
 * @private
 */
function build_directory_path (path) {
	var directories = path.split('/');
	var _path = directories[0];
	var i = 0;

	while (i < directories.length) {
		if (!File.exists(_path)) {
			fs.mkdirSync(_path);
		}

		_path += ('/' + directories[++i]);
	}

	if (!File.exists(path)) {
		console.log(Errors.FILE_BUILD_DIRECTORY_PATH, path);
		return false;
	}

	return true;
}

/**
 * update_file( file, content, mode )
 *
 * Performs a fail-safe file update action
 * @param {file} [String] : The file name
 * @param {content} [String] : The content to add to the file, if the mode constitutes a write/append action
 * @param {mode} [String] : The update mode (see: update_calls)
 * @private
 */
function update_file (file, content, mode) {
	if (File.canWriteTo(file)) {
		update_calls[mode](file, content);
	} else {
		if (build_directory_path(File.getDirectoryPath(file))) {
			update_file(file, content, mode);
		}
	}
}

/**
 * File
 *
 * Filesystem utilities
 * @export
 */
var File = {};

/**
 * File.getExtension( file )
 *
 * Returns the extension for a file
 * @param {file} [String] : The file name
 * @returns [String]
 */
File.getExtension = function (file) {
	file = file.split('.');

	return file[file.length - 1];
};

/**
 * File.getDirectoryPath( file )
 *
 * Returns the directory path leading up a file, e.g. "src/app/system/render.js" - > "src/app/system"
 * @param {file} [String] : The path to the file, name-inclusive
 * @returns [String]
 */
File.getDirectoryPath = function (file) {
	var path = file.split('/');

	path.pop();

	return path.join('/');
};

/**
 * File.getLowerPath( file, depth )
 *
 * Forward-truncates a file path by removing an arbitrary number of upper-level directories
 * @param {file} [String] : The top-level path to the file, name-inclusive
 * @param {depth} [Number] : The number of subdirectories to skip through
 * @returns [String]
 */
File.getLowerPath = function (file, depth) {
	var directories = file.split('/');

	depth++;

	// Avoid splicing the actual file if we exceed {depth}
	while (--depth && directories.length > 1) {
		directories.splice(0, 1);
	}

	return directories.join('/');
};

/**
 * File.hasExtension( file, extension )
 *
 * Determines whether a file has a particular extension
 * @param {file} [String] : The file to check
 * @param {extension} [String] : The extension to check
 * @returns [Boolean]
 */
File.hasExtension = function (file, extension) {
	return File.getExtension(file) === extension;
};

/**
 * File.canWriteTo( file )
 *
 * Determines whether a file can be written to based on the existence of its directory path
 * @param {file} [String] : The file to check
 * @returns [Boolean]
 */
File.canWriteTo = function (file) {
	var directoryPath = File.getDirectoryPath(file);

	return directoryPath === "" || File.exists(directoryPath);
};

/**
 * File.exists( file )
 *
 * Determines whether a file exists
 * @param {file} [String] : The file to check
 * @returns [Boolean]
 */
File.exists = function (file) {
	try {
		fs.statSync(file);
	} catch (e) {
		if (e.code === Errors.fs.ENOENT) {
			return false;
		}
	}

	return true;
};

/**
 * File.isDirectory( file )
 *
 * Determines whether or not a file is a directory (failure-safe)
 * @param {file} [String] : The file to check
 * @returns [Boolean]
 */
File.isDirectory = function (file) {
	return File.exists(file) && fs.statSync(file).isDirectory();
};

/**
 * File.write( file, content )
 *
 * Writes content to a file
 * @param {file} [String] : The file to write to
 * @param {contents} [String] : The content to write
 */
File.write = function (file, content) {
	update_file(file, content, MODE_WRITE);
};

/**
 * File.append( file, content )
 *
 * Appends content to a file
 * @param {file} [String] : The file to append to
 * @param {contents} [String] : The content to append
 */
File.append = function (file, content) {
	update_file(file, content, MODE_APPEND);
};

/**
 * File.scan( directory )
 *
 * Recursively returns a list of all files within a directory and its subdirectories
 * @param {directory} [String] : The directory path
 * @returns [Array<String>]
 */
File.scan = function (directory) {
	var list = [];
	var files = fs.readdirSync(directory);

	A.eachInArray(files, function (file) {
		var _file = directory + '/' + file;

		if (File.isDirectory(_file)) {
			list = list.concat(File.scan(_file));
		} else {
			list.push(_file);
		}
	});

	return list;
}

module.exports = File;