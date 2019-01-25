/**
 * ============================
 * Library: jsonparse
 * ============================
 */
var jsonparse = (function() {

	// ---------------------------
	// Utility Functions
	// ---------------------------
	var at = 0;


	// Function: "detectValue"
	// ---------------------------
	var detectValue = function(str, index){
		switch(str[index+1]) {
			case '{': return 'object'; break;
			case '[': return 'array'; break;
			case '"': return 'string'; break;
			default:
				console.log("We didn't detect any value for the character '"+str[index+1]+"'");
				return 'valueNotDetected';
		}		
	};

	// Function: "explore"
	// ---------------------------
	var explore = function(str){
		var value = detectValue(str, -1);
		exploreValue[value](str);
		if (at == str.length) {
			console.log("We parsed the JSON string without errors: " + str);
		} else {
			console.log("Something went wrong during the parsing of the JSON string: " + str);
		};
	};

	// Function: "exploreObject"
	// ---------------------------
	var exploreObject = function(str){
		if (str[at] != '{') { throw "ParseError: Missing the '{' at the beginning of the object. (found '"+str[at]+"' instead)"; }; 
		at++;
		exploreString(str);
		if (str[at] != ':') { throw "ParseError: Missing ':' between the key and the value of the object."; };
		var value = detectValue(str, at);
		at++;
		exploreValue[value](str);
		if (str[at] != '}') { throw "ParseError: Missing the '}' at the end of the object."; };
		at++;
	};

	// Function: "exploreString"
	// ---------------------------
	var exploreString = function(str){
		if (str[at] != '"') { throw "ParseError: Missing the '\"' at the beginning of the string."; }
		at++; // We assume that the first character of the string is '"'
		do { at++; } while (str[at] != '"')
		at++;
	};

	// Function: "exploreValue"
	// ---------------------------
	var exploreValue = {
		'object': exploreObject,
		'string': exploreString,
	};


	// ---------------------------
	// Library API
	// ---------------------------
	return {

		// API: "parse"
		// ---------------------------
		parse: function(inputString) {
			console.log("<<<================================");
			at = 0;
			try{
				explore(inputString);
			} catch(error){
				console.log(error);
				console.log("Error during the parsing of the string: " + inputString);
			}
			console.log("================================>>>");
		}

	}; // end of 'return'

})(); // end of IIFE