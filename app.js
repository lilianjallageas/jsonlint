// app.js

new Vue({

	// Vue Element
	// ===========
	el: '#app_jsonlint',


	// Vue Data
	// ===========
	data: {
		inputString: JSON.stringify({"firstName":"John","lastName":"Smith","isAlive":true,"age":27,"address":{"streetAddress":"21 2nd Street","city":"New York","state":"NY","postalCode":"10021-3100"},"phoneNumbers":[{"type":"home","number":"212 555-1234"},{"type":"office","number":"646 555-4567"},{"type":"mobile","number":"123 456-7890"}],"children":[],"spouse":null}),
		outputString: "",
		indentation: "    ",
	},

	// Mounted
	// ===========
	mounted:function(){
		jsonparse.parse('{"firstName":"John","lastName":"Smith","isAlive":true,"age":27,"address":{"streetAddress":"21 2nd Street","city":"New York","state":"NY","postalCode":"10021-3100"},"phoneNumbers":[{"type":"home","number":"212 555-1234"},{"type":"office","number":"646 555-4567"},{"type":"mobile","number":"123 456-7890"}],"children":[],"spouse":null}');
		jsonparse.parse('{"children": [],"spouse": null, "emptyObject": {} }');
		jsonparse.parse('  1234567890  ');
		jsonparse.parse('{\n"test_number" : 1234567890\n }');
		jsonparse.parse('123e-5');
		jsonparse.parse('null');
		jsonparse.parse('true');
		jsonparse.parse('false');
		jsonparse.parse('"test"');
		jsonparse.parse('{"test_A":"test_A"}');
		jsonparse.parse('{"test_A":"test_A"}');
		jsonparse.parse('\n{\n    "test_A" : "test_A",\n    "test_B" : "test_B"\n}');
		jsonparse.parse('\n[\n    "test_A"\n]\n');
		jsonparse.parse('["test_A",{"test_A":"test_A"},null]');
		jsonparse.parse('[true,false]');
		jsonparse.parse('[{"test_A":"test_A"},123456,null,false,{"array":[1234,"test"]}]');
	},

	// Vue Methods
	// ===========
	methods: {

		lint: function() {
			var parsedObject = jsonlint.parse(this.inputString);
			this.outputString = jsonlint.toString(parsedObject, this.indentation);
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