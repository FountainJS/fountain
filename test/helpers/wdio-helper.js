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

exports.liveReloadJsTest = function liveReloadJsTest(url, options) {
  return options.framework === 'angular1' ? exports.liveReloadAngular1(url) : exports.liveReloadJs(url);
};

exports.liveReloadJs = function liveReloadJs(url) {
  return new Promise((resolve, reject) => {
    console.log('Webdriver.io test "live reload for JS" on', url);
    client
      .url(url)
      .waitForExist('header p a', 5 * 60 * 1000)
      .getText('header p a').then(text => {
        try {
          expect(text).to.equal('Travis');
          resolve();
          console.log('Resolved liveReloadJsTest promise');
        } catch (error) {
          reject(error);
          console.log('Rejected liveReloadJsTest promise');
        }
      }, reject);
  });
};

exports.liveReloadAngular1 = function liveReloadAngular1(url) {
  return new Promise((resolve, reject) => {
    console.log('Webdriver.io test "live reload for JS" on', url);
    client
      .url(url)
      .waitUntil(() => {
        return client.elements('h3').then(elements => {
          console.log(elements);
          return elements.value.length === 1;
        });
      }, 5 * 60 * 1000)
      .elements('h3').then(elements => {
        try {
          expect(elements.value.length).to.equal(1);
          resolve();
          console.log('Resolved liveReloadJsTest promise');
        } catch (error) {
          reject(error);
          console.log('Rejected liveReloadJsTest promise');
        }
      }, reject);
  });
};

exports.liveReloadCssTest = function liveReloadCssTest(url) {
  return new Promise((resolve, reject) => {
    console.log('Webdriver.io test "live reload for CSS" on', url);
    setTimeout(() => {
      client
        .url(url)
        .waitUntil(() => client.getCssProperty('header p a', 'color').then(color => color.value === 'rgba(255,0,0,1)'), 5 * 60 * 1000)
        .getCssProperty('header p a', 'color').then(color => {
          try {
            expect(color.value).to.equal('rgba(255,0,0,1)');
            resolve();
            console.log('Resolved liveReloadCssTest promise');
          } catch (error) {
            reject(error);
            console.log('Rejected liveReloadCssTest promise');
          }
        }, reject);
    }, 30 * 1000);
  });
};

