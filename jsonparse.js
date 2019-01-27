/**
 * ============================
 * Library: jsonparse
 * ============================
 */
var jsonparse = (function() {

	// ---------------------------
	// Variables
	// ---------------------------
	var at = -1;
	var str = "";


	// ---------------------------
	// Utility Functions
	// ---------------------------

	// Function: "next"
	// ---------------------------
	var next = function(steps){
		if (steps && Number.isInteger(steps)) { at = at + steps; } 
		else { at++; };
	};

	// Function: "detectNextValue"
	// ---------------------------
	var detectNextValue = function(){
		var nextChar = str[at+1];
		if (nextChar == '{') { return 'object'; }
		else if (nextChar == '[') { return 'array'; }
		else if (nextChar == '"') { return "string"; }
		else if (nextChar == 't' || nextChar == 'f') { return 'boolean'; }
		else if (nextChar == 'n') { return 'null'; }
		else { 
			console.log("We didn't detect any value for the character '"+str[at+1]+"'");
			return 'valueNotDetected'; 
		}
	};

	// Function: "explore"
	// ---------------------------
	var explore = function(){
		exploreValue[detectNextValue(str, at)](str);
		if (at == str.length) {
			console.log("Successfully parsed the JSON string: " + str);
		} else {
			console.log("ERROR: Something went wrong during the parsing of the JSON string: " + str);
		};
	};

	// Function: "exploreObject"
	// ---------------------------
	var exploreObject = function(){
		next();
		if (str[at] != '{') { throw "ParseError: Missing the '{' at the beginning of the object. (found '"+str[at]+"' instead)"; };
		// Looping though the properties of the object
		do {
			exploreString(str);
			if (str[at] != ':') { throw "ParseError: Missing ':' between the key and the value of the object."; };
			exploreValue[detectNextValue(str, at)](str);
		} while (str[at] == ',')
		if (str[at] != '}') { throw "ParseError: Missing the '}' at the end of the object."; };
		next();
	};

	// Function: "exploreString"
	// ---------------------------
	var exploreString = function(){
		next();
		if (str[at] != '"') { throw "ParseError: Missing the '\"' at the beginning of the string."; }
		next();
		do { at++; } while (str[at] != '"')
		next();
	};

	// Function: "exploreArray"
	// ---------------------------
	var exploreArray = function(){
		// TODO
	};

	// Function: "exploreNumber"
	// ---------------------------
	var exploreNumber = function(){
		// TODO
	};

	// Function: "exploreBoolean"
	// ---------------------------
	var exploreBoolean = function(){
		next();	
		switch(str[at]) {
			case 't':
				if (str.slice(at, at+4) == 'true') { next(4); } 
				else { throw "ParseError: '"+str.slice(at, at+4)+"' is not a valid boolean."; };
				break;
			case 'f':
				if (str.slice(at, at+5) == 'false') { next(5); } 
				else { throw "ParseError: '"+str.slice(at, at+5)+"' is not a valid boolean."; };
				break;
			default:
				 throw "ParseError: Booleans only start with 't' or 'f'.";
		}
	};

	// Function: "exploreNull"
	// ---------------------------
	var exploreNull = function(){
		// TODO
	};

	// Function: "exploreValue"
	// ---------------------------
	var exploreValue = {
		'object': exploreObject,
		'array': exploreArray,
		'string': exploreString,
		'number': exploreNumber,
		'boolean': exploreBoolean,
		'null': exploreNull,
	};


	// ---------------------------
	// Library API
	// ---------------------------
	return {

		// API: "parse"
		// ---------------------------
		parse: function(inputString) {
			console.log("<<<================================");
			at = -1;
			str = inputString;
			try{
				explore(inputString);
			} catch(error){
				console.log(error);
				console.log("Error during the parsing of the string: " + inputString);
			}
		}

	}; // end of 'return'

})(); // end of IIFE