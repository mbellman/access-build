#!/usr/bin/env node

var compile = require('./compile.js');

/**
 * collect_process_args( args )
 *
 * Collects and analyzes the process arguments before passing the information on to compile()
 */
function collect_process_args (args) {
	args.splice(0, 2);

	console.log(args);
}

// Program entry point
collect_process_args(process.argv);