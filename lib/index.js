const eventStream = require('event-stream');

// Remove the first item in the line and also remove empty lines
function removeUnnecessaryData(data, callback) {
  const newData = data.replace(/^\w+\s?/, '');

  callback(undefined, newData ? newData : undefined);
}

// Split lines into robot operation pairs
function splitLines(data) {
  const newData = data.split(/\s+/);

  while (newData.length) {
    this.emit('data', newData.shift() + newData.shift());
  }
}

function run(inStream) {

  return inStream
    .pipe(eventStream.split())
    .pipe(eventStream.map(removeUnnecessaryData))
    .pipe(eventStream.through(splitLines));
}

module.exports = run;
