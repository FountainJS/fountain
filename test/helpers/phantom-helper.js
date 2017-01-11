'use strict';

const expect = require('chai').expect;
const spawn = require('cross-spawn');

exports.run = function run(url) {
  return new Promise((resolve, reject) => {
    const result = spawn.sync(`${__dirname}/phantomjs`, [`${__dirname}/phantom-runner.js`, url], {stdio: 'inherit'});
    if (result.status === 0) {
      console.log('phantom run success');
      resolve();
    } else {
      console.log('phantom run failed', result.output);
      reject();
    }
  });
};
