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
		parseSuccess: false,
	},


	// Vue Methods
	// ===========
	methods: {

		lint: function() {
			this.parseSuccess = false;
			this.parseError = "";
			this.outputString = "";
			if (this.inputString.trim() == "") { this.parseError = "Please enter a valid JSON string."; return; };
			try{
				var parsedObject = jsonlint.parse(this.inputString);
				this.outputString = jsonlint.toString(parsedObject, this.indentation);
				this.parseSuccess = true;
			} catch (error) {
				this.parseError = error;
			}
		},

		clearString: function(element) {
			this[element] = "";
			document.getElementById(element).focus();
			this.parseSuccess = false;
		},

		copyToClipboard: function() {
			var copyText = document.getElementById("outputString"); // Get the text field
			copyText.select(); // Select the text field
			document.execCommand("copy"); // Copy the text inside the text field
		}

	}

});