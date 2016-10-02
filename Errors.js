#!/usr/bin/env node

/**
 * Common error strings
 * @export
 */
var Errors = {
	// No source or target directory specified in compile options
	SOURCE_OR_DESTINATION_UNDEFINED: "Please specify an input source and output destination.",

	// Unable to create a writable path via build_path() (see: File)
	FILE_BUILD_DIRECTORY_PATH: "Error building file path: ",

	// Node fs error codes
	fs: {
		// No entry/file not found
		ENOENT: "ENOENT"
	}
};

module.exports = Errors;