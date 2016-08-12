#!/usr/bin/env node

var path = require('path');
var fs = require('fs');

var main = require('../');

var inputStream = process.stdin;
var outputStream = process.stdout;
var inFilePath, isFile;

// An input file was provided
if (process.argv[2]) {
  inFilePath = path.resolve(process.argv[2]);
  isFile = fs.statSync(inFilePath).isFile();

  if (isFile) {
    inputStream = fs.createReadStream(inFilePath);
  }
}

// An output file was provided
if (process.argv[3]) {
  outputStream = fs.createWriteStream(path.resolve(process.argv[3]));
}

// Call the main function and pass results where we need to
main(inputStream).pipe(outputStream);
