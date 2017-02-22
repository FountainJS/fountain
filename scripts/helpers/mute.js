/**
 * Silence Yeoman during tests
 * uses github.com/balderdashy/fixture-stdout
 *
 * Usage:
 * ```
 * // test-something.js
 * var Output = require( './mute' );
 *
 * // beforeEach() test:
 * this.app.on( 'start', Output.mute );
 * this.app.on( 'end', Output.unmute );
 * ```
 */
'use strict';

const Fixture = require('fixture-stdout');
const fixtureOut = new Fixture();
const fixtureErr = new Fixture({
  stream: process.stderr
});

const writesOut = [];
const writesErr = [];

// Mute
module.exports.mute = function mute() {
  fixtureOut.capture(string => {
    writesOut.push({string});

    // Prevent original write
    return false;
  });

  fixtureErr.capture(string => {
    writesErr.push({string});

    // Prevent original write
    return false;
  });
};

// Unmute
module.exports.unmute = function () {
  fixtureOut.release();
  fixtureErr.release();
};

// Return the output that was captured
module.exports.getMutedWrites = function () {
  return {
    out: writesOut,
    err: writesErr
  };
};
