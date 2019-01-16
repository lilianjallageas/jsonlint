// app.js

new Vue({

	// Vue Element
	// ===========
	el: '#app_jsonlint',


	// Vue Data
	// ===========
	data: {
		inputString: "",
		outputString: ""
	},


	// Vue Methods
	// ===========
	methods: {

		lint: function() {
			this.outputString = jsonlint.lint(this.inputString);
		},

	}

});