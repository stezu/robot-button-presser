/* eslint-disable no-console */

const path = require('path');
const fs = require('fs');

// const expect = require('chai').expect;
const eventStream = require('event-stream');

const main = require('../');

const smallFile = path.resolve('./files', 'A-small-practice.in');
const largeFile = path.resolve('./files', 'A-large-practice.in');

describe('[Main]', () => {

  it.only('succeeds with the small practice file', (done) => {
    const inStream = fs.createReadStream(smallFile);

    main(inStream)
      .on('data', (chunk) => {
        console.log(chunk.toString());
      })
      .on('error', done)
      .on('end', done);
    // main(inStream).pipe(eventStream.wait((err, data) => {

    //   if (err) {
    //     throw err;
    //   }

    //   console.log(data);
    //   done();
    // }));
  });

  it('succeeds with the large practice file', (done) => {
    const inStream = fs.createReadStream(largeFile);

    main(inStream).pipe(eventStream.wait((err, data) => {

      if (err) {
        throw err;
      }

      console.log(data);
      done();
    }));
  });
});
