'use strict';

const expect = require('chai').expect;
const exec = require('../../scripts/exec');
const spy = require('through2-spy');
const regex = /Executed ([^\s]*) of (\1)/;

exports.unitTests = function *() {
  const result = yield exports.gulpTest();
  expect(result).to.contain('SUCCESS');
};

exports.gulpTest = function () {
  return new Promise(resolve => {
    let logs = '';
    const testProcess = exec('gulp', ['test'], {stdio: 'pipe'}).process;
    testProcess.stderr.pipe(process.stderr);
    testProcess.stdout.pipe(spy(chunk => {
      logs += chunk.toString();
      const result = regex.exec(logs);
      if (result !== null) {
        resolve(result.input);
      }
    })).pipe(process.stdout);
  });
};
