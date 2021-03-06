/**
 * ============================
 * Library: jsonlint
 * ============================
 */
var jsonlint = (function() {

	var spacing = "";

	// ---------------------------
	// Utility Functions
	// ---------------------------

	// Function: "printObject"
	// ---------------------------
	var printObject = function(object, level){
		if (object === null) { return "null"; };
		if (typeof object != 'object' || !object) { 
			if (typeof object == 'string') { return '\"' + object + '\"'; }
			else return object; 
		};
		var outputString = '{';
		var keys = Object.getOwnPropertyNames(object);
		for (var i = 0; i < keys.length; i++) { 
			var property = keys[i];
			var value = object[keys[i]]
			outputString += '\n' + spacing.repeat(level+1) + '"' + property + '"' + ': ';
			if (typeof value === 'object') {
				if (Array.isArray(value)) { 
					outputString += printArray(value, level+1); // Calling the nested function for the Array
				} else { 
					outputString += printObject(value, level+1); // Calling the nested function for the Object
				};
			} else {
				// Outputting the native type (only putting quotes on strings)
				if (typeof object[property] == 'string') { outputString += '"' + object[property] + '"'; } 
				else { outputString += object[property]; }
				
			};
			//Adding a comma "," between each properties, except for the last one
			if (i != keys.length-1) { outputString += "," } else { outputString += "\n" };
		}
		outputString += spacing.repeat(level) + '}';
		return outputString;
	};

	// Function: "printArray"
	// ---------------------------
	var printArray = function(array, level){
		if(array.length == 0) { return "[]" };
		var outputString = '[';
		for (var i = 0; i < array.length; i++) { 
			var elem = array[i];
			if (typeof elem === 'object') {
				if (Array.isArray(elem)) { 
					// Calling the nested function for the Array
					outputString += printArray(elem, level+1);
				} else { 
					// Calling the nested function for the Object
					outputString += printObject(elem, level); 
				};
			} else {
				// Outputting the native type
				outputString += '"' + elem + '"';
			};
			//Adding a comma "," between each elements of the arrays, except for the last one
			if (i != array.length-1) { outputString += "," };
		}
		outputString += ']';
		return outputString;
	};


	// ---------------------------
	// Library API
	// ---------------------------
	return {

		// API: "parse"
		// ---------------------------
		parse: function(inputString) {
			try {
				return JSON.parse(inputString);
			} catch (error){
				throw jsonparse.parse(inputString);
			};
		},

		// API: "toString"
		// @param "object": Any javascript object
		// @param "indentation": Spaces or tabs
		// ---------------------------
		toString: function(object, indentation) {
			// Checking the parameters
			if (!indentation) { return "Please indentation."; } else { spacing = indentation; };

			// Printing the javascript object into the JSON format
			var outputString = '';
			if (Array.isArray(object)) { 
				outputString += printArray(object, 0);
			} else { 
				outputString += printObject(object, 0);
			};
			return outputString;
		},

	}; // end of 'return'

})(); // end of IIFE