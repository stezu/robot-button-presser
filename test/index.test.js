const path = require('path');
const fs = require('fs');

const expect = require('chai').expect;
const nodeStream = require('node-stream');

const main = require('../');

const smallFile = path.resolve('./files', 'A-small-practice.in');
const largeFile = path.resolve('./files', 'A-large-practice.in');

describe('[Main]', () => {

  function validateResults(inStream, expected, done) {

    inStream
      .pipe(main())
      .pipe(nodeStream.wait())
      .on('error', (err) => {
        throw err;
      })
      .on('data', (data) => {
        const lines = data.toString().split(/\n/);

        expect(lines).to.deep.equal(expected.map((seconds, index) => {
          return `Case #${index + 1}: ${seconds}`;
        }));

        done();
      });
  }

  it('succeeds with the small practice file', (done) => {
    const expectedResults = [
      6,
      100,
      4,
      10,
      1000,
      306,
      102,
      56,
      70,
      1,
      160,
      292,
      35,
      132,
      90,
      112,
      113,
      237,
      194,
      220
    ];
    const inStream = fs.createReadStream(smallFile);

    validateResults(inStream, expectedResults, done);
  });

  it('succeeds with the large practice file', (done) => {
    const expectedResults = [
      6,
      100,
      4,
      1289,
      900,
      1134,
      1,
      1465,
      931,
      1758,
      998,
      1647,
      1460,
      1073,
      2213,
      2414,
      2386,
      2524,
      1431,
      1013,
      1130,
      982,
      1635,
      1852,
      780,
      1155,
      894,
      278,
      1969,
      1612,
      2507,
      1363,
      2411,
      1947,
      1948,
      864,
      2359,
      1226,
      1180,
      2296,
      1392,
      1667,
      1006,
      1240,
      1295,
      1353,
      1976,
      1260,
      2240,
      2040,
      1841,
      2800,
      2105,
      1787,
      1689,
      1356,
      1732,
      1436,
      781,
      1114,
      1383,
      995,
      1351,
      1536,
      1384,
      100,
      1466,
      1313,
      1568,
      2251,
      1424,
      2049,
      1279,
      2241,
      1025,
      1360,
      867,
      1392,
      1492,
      1243,
      2095,
      2177,
      1465,
      2033,
      1593,
      10000,
      2010,
      1338,
      2306,
      1363,
      1197,
      726,
      1255,
      1540,
      1229,
      2281,
      1252,
      1783,
      1189,
      815
    ];
    const inStream = fs.createReadStream(largeFile);

    validateResults(inStream, expectedResults, done);
  });
});
