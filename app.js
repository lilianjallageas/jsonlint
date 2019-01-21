// app.js

new Vue({

	// Vue Element
	// ===========
	el: '#app_jsonlint',


	// Vue Data
	// ===========
	data: {
		inputString: JSON.stringify({"firstName":"John","lastName":"Smith","isAlive":true,"age":27,"address":{"streetAddress":"21 2nd Street","city":"New York","state":"NY","postalCode":"10021-3100"},"phoneNumbers":[{"type":"home","number":"212 555-1234"},{"type":"office","number":"646 555-4567"},{"type":"mobile","number":"123 456-7890"}],"children":[],"spouse":null}),
		outputString: ""
	},


	// Vue Methods
	// ===========
	methods: {

		lint: function() {
			var parsedObject = jsonlint.parse(this.inputString);
			this.outputString = jsonlint.toString(parsedObject, "	");
		},

		clearString: function(element) {
			this[element] = "";
		},

		copyToClipboard: function() {
			var copyText = document.getElementById("outputString"); // Get the text field
			copyText.select(); // Select the text field
			document.execCommand("copy"); // Copy the text inside the text field
		}

	}

});