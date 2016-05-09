'use strict';

const exec = require('../../scripts/exec');
const spy = require('through2-spy');
const regex = /\[BS\] Access URLs:\n -*\n.*\n *External: ([^\s]*)/;
const testRegex = /Finished 'test'/;

let serveProcess = null;

exports.serve = function serve() {
  return exports.execServe(['serve']);
};

exports.serveDist = function serveDist() {
  return exports.execServe(['serve:dist']);
};

exports.execServe = function execServe(command) {
  return new Promise(resolve => {
    let logs = '';
    if (serveProcess !== null) {
      console.warn('Server process still running !!!!');
    }
    serveProcess = exec('gulp', command, {stdio: 'pipe'}).process;
    serveProcess.stderr.pipe(process.stderr);
    serveProcess.stdout.pipe(spy(chunk => {
      logs += chunk.toString();
      const result = regex.exec(logs);
      if (result !== null) {
        resolve(result[1]);
      }
    })).pipe(process.stdout);
  });
};

exports.killServe = function killServe() {
  serveProcess.kill('SIGTERM');
  serveProcess = null;
};

exports.test = function () {
  return new Promise(resolve => {
    let logs = '';
    const testProcess = exec('gulp', ['test'], {stdio: 'pipe'}).process;
    testProcess.stderr.pipe(process.stderr);
    testProcess.stdout.pipe(spy(chunk => {
      logs += chunk.toString();
      const result = testRegex.exec(logs);
      if (result !== null) {
        resolve(logs);
        testProcess.kill('SIGTERM');
      }
    })).pipe(process.stdout);
  });
};
