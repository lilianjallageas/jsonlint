# jsonlint

This library will allow you to parse and print JSON strings.

### Library API

The 'jsonlint' library exposes the following functions:
+ parse
    + param "string": String containing a JSON object
+ toString
    + param "object": A Javascript object
    + param "indentation": The desired indentation when linting the JSON

### Library Usage

In order to use the 'jsonlint' library, you'll need to import it in your 'index.html':
+ `<script src="<lib_path>/jsonlint.js"></script>`

Then, you can use the library in your javascript code:
+ `var parsedObject = jsonlint.parse('{"123": "456"}');`
+ `var lintedString = jsonlint.toString(parsedObject, "  ");`

### Demo

Click here: https://lilianjallageas.github.io/jsonlint/
