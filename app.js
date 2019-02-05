// app.js

new Vue({

	// Vue Element
	// ===========
	el: '#app_jsonlint',


	// Vue Data
	// ===========
	data: {
		inputString: "",
		outputString: "",
		indentation: "    ",
		parseError: "",
	},


	// Vue Methods
	// ===========
	methods: {

		lint: function() {
			this.parseError = "";
			this.outputString = "";
			try{
				var parsedObject = jsonlint.parse(this.inputString);
				this.outputString = jsonlint.toString(parsedObject, this.indentation);				
			} catch (error) {
				this.parseError = error;
			}
		},

		clearString: function(element) {
			this[element] = "";
			document.getElementById(element).focus();
		},

		copyToClipboard: function() {
			var copyText = document.getElementById("outputString"); // Get the text field
			copyText.select(); // Select the text field
			document.execCommand("copy"); // Copy the text inside the text field
		}

	}

});