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
	var skipableChars = [' ','\t','\r','\n'];


	// ---------------------------
	// Utility Functions
	// ---------------------------

	// Function: "next"
	// ---------------------------
	var next = function(steps){
		if (steps && Number.isInteger(steps)) { at = at + steps; } 
		else { at++; };
	};

	// Function: "skipChars"
	// Skips the spaces and carriage returns
	// ---------------------------
	var skipChars = function(){
		while (skipableChars.includes(str.charAt(at))) { 
			next(); 
		};
	};

	// Function: "detectNextValue"
	// ---------------------------
	var detectNextValue = function(){
		var nextChar = str[at+1];
		if (skipableChars.includes(nextChar)) { next(); return detectNextValue(); }
		else if (nextChar == '{') { return 'object'; }
		else if (nextChar == '[') { return 'array'; }
		else if (nextChar == '"') { return "string"; }
		else if (nextChar == 't' || nextChar == 'f') { return 'boolean'; }
		else if (nextChar == 'n') { return 'null'; }
		else if (nextChar == '-' || ['0','1','2','3','4','5','6','7','8','9'].includes(nextChar)) { return 'number'; }
		else { 
			console.log("We didn't detect any value for the character '"+str[at+1]+"'");
			return 'valueNotDetected'; 
		}
	};


	// Function: "exploreObject"
	// ---------------------------
	var exploreObject = function(){
		next();
		skipChars();
		if (str[at] != '{') { throw "ParseError: Missing the '{' at the beginning of the object. (found '"+str[at]+"' instead)"; };
		skipChars();
		if (str[at+1] != '}') { // If the object is not empty...
			do { // Looping though the properties of the object
				exploreString(str);
				if (str[at] != ':') { throw "ParseError: Missing ':' between the key and the value of the object."; };
				exploreValue[detectNextValue(str, at)](str);
			} while (str[at] == ',')
			if (str[at] != '}') { throw "ParseError: Missing the '}' at the end of the object."; };
		} else { next(); };
		next();
		skipChars();
	};


	// Function: "exploreString"
	// ---------------------------
	var exploreString = function(){
		next();
		skipChars();
		if (str[at] != '"') { throw "ParseError: Missing the '\"' at the beginning of the string."; }
		next();
		do {
			if (['\b','\f','\n','\r','\t','\v','\0','\\','\'','\"'].includes(str.charAt(at))) { throw "ParseError: This character is not allowed in a string: "+str.charAt(at); }
			else { at++; };
		} while (str[at] != '"')
		next();
		skipChars();
	};


	// Function: "exploreArray"
	// ---------------------------
	var exploreArray = function(){
		next();
		if (str[at] != '[') { throw "ParseError: Missing the '[' at the beginning of the array. (found '"+str[at]+"' instead)"; };
		skipChars();
		if (str[at+1] != ']') { // If the array is not empty...
			do { // ... we loop though the values of the array
				skipChars();
				exploreValue[detectNextValue(str, at)](str);
			} while (str[at] == ',')
			if (str[at] != ']') { throw "ParseError: Missing the ']' at the end of the array."; };			
		} else { next(); };
		next();
		skipChars();
	};


	// Function: "exploreNumber"
	// ---------------------------
	var exploreNumber = function(){
		var index = at;
		do { index++ } while ((index != str.length-1 && [',', '}', ']'].includes(str[index+1]) == false))
		if(isNaN(str.slice(at+1,index+1))) {
			throw "ParseError: This is not a valid number:"+ str.slice(at+1,index+1);
		} else {
			at = index;
			next();
		}
		skipChars();
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
		skipChars();
	};


	// Function: "exploreNull"
	// ---------------------------
	var exploreNull = function(){
		next();
		skipChars();
		if (str.slice(at, at+4) == 'null') { next(4); }
		else { throw "ParseError: '"+str.slice(at, at+4)+"' should be 'null'."; };
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
			var outputString = "";
			try{
				exploreValue[detectNextValue(str, at)](str);
				if (at == str.length) { outputString = "Successfully parsed the JSON string: " + str; } 
				else { outputString = "ERROR: Something went wrong during the parsing of the JSON string: " + str; };
			} catch(error){
				errorAtLine = ((str.slice(0,at).match(/(\r|\n)/g)) || []).length+1;
				linesArray = str.split(/\r?\n/);
				var errorAt = at;
				if (errorAtLine > 1) {
					var lastNewLineIndex = (str.slice(0,at)).lastIndexOf('\n');
					errorAt = at - lastNewLineIndex - 1;
				};
				outputString = "Error during the parsing of the JSON, on line "+ errorAtLine + "\n";
				if(errorAtLine > 1) { console.log(linesArray[errorAtLine-2]); }
				outputString = linesArray[errorAtLine-1] + "\n";
				outputString = " ".repeat(errorAt)+"↳"+" "+error;
			}
			console.log(outputString);
			return outputString;
		}

	}; // end of 'return'

})(); // end of IIFE