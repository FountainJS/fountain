'use strict';

const expect = require('chai').expect;
const webdriverio = require('webdriverio');
const os = require('os');

const wdioOptions = {
  logLevel: 'debug',
  logOutput: process.stdout,
  desiredCapabilities: {
    browserName: 'chrome',
    idleTimeout: 1000,
    maxDuration: 3600,
    name: os.hostname()
  }
};

if (process.env.TRAVIS === 'true') {
  wdioOptions.desiredCapabilities['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;
  wdioOptions.desiredCapabilities.build = process.env.TRAVIS_BUILD_NUMBER;
  wdioOptions.user = process.env.SAUCE_USERNAME;
  wdioOptions.key = process.env.SAUCE_ACCESS_KEY;
} else {
  const saucelabsCreds = require('../saucelabs.creds.json');
  wdioOptions.user = saucelabsCreds.user;
  wdioOptions.key = saucelabsCreds.key;
}

let client;

exports.init = function init() {
  return new Promise(resolve => {
    client = webdriverio.remote(wdioOptions).init();
    client.then(resolve);
  });
};

exports.close = function close() {
  return new Promise((resolve, reject) => {
    client.end().then(() => resolve(), () => reject());
  });
};

exports.techsTest = function techsTest(url) {
  return new Promise((resolve, reject) => {
    console.log('Webdriver.io test "Techs" counting <h3> on', url);
    client
      .url(url)
      .waitForExist('h3', 5 * 60 * 1000)
      .elements('h3').then(elements => {
        try {
          expect(elements.value.length).to.equal(8);
          resolve();
          console.log('Resolved techsTest promise');
        } catch (error) {
          reject(error);
          console.log('Rejected techsTest promise');
        }
      }, reject);
  });
};
