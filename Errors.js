#!/usr/bin/env node

/**
 * Common error strings
 * @export
 */
var Errors = {
	// Invalid process operation
	INVALID_OPERATION: "Invalid operation: ",

	// No source file or directory specified in compile options
	SOURCE_UNDEFINED: "Please specify the source file or directory to compile from.",

	// Unable to create a writable path via build_path() (see: File)
	FILE_BUILD_DIRECTORY_PATH: "Error building file path: ",

	// Node fs error codes
	fs: {
		// No entry/file not found
		ENOENT: "ENOENT"
	}
};

module.exports = Errors;