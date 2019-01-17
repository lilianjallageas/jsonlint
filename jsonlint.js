/**
 * ============================
 * Library: jsonlint
 * ============================
 */
var jsonlint = (function() {

	return {
		// ---------------------------
		// Utility Functions
		// ----------------------------

		lint: function(inputString) {
			return inputString;
		},

		parse: function(inputString) {
			return JSON.parse(inputString);
		},

		toString: function(object, level) {

			var spacing = "    ";
			var outputString = Array.isArray(object) ? "[\n" : "{\n";

			for (var property in object) {
				if (object.hasOwnProperty(property)) {
					outputString += spacing.repeat(level+1) + property + ": ";
					if (typeof object[property] === 'object') {
						// Calling the 'toString' function for nested objects
						outputString += jsonlint.toString(object[property], level+1);
					} else {
						// Outputting the native types
						outputString += object[property];
					};
					outputString += "\n";
				}
			}

			outputString += Array.isArray(object) ? spacing.repeat(level) + "]" : spacing.repeat(level) + "}";
			return outputString;
		},

	}; // end of 'return'

})(); // end of IIFE