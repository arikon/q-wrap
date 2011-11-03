q-wrap
======

Utility library to wrap async functions with last callback argument to promise returning functions.

## Usage

### Convert callback-based function

```js
var convert = require('q-wrap').convert,
    fs = require('fs'),

    readFile = convert(fs.readFile);

readFile('test.txt')
    .then(function(content) {
        console.log(content);
    })
    .fail(function(err) {
        console.error('Error opening file: %s', err);
    })
```

### Execute callback-based function

```js
var execute = require('q-wrap').execute,
    fs = require('fs');

execute(fs.readFile, 'test.txt')
    .then(function(content) {
        console.log(content);
    })
    .fail(function(err) {
        console.error('Error opening file: %s', err);
    })
```
