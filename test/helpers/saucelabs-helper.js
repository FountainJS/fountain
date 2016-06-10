'use strict';

const Promise = require('bluebird');
const sauceConnectLauncher = require('sauce-connect-launcher');
const saucelabsCreds = require('../saucelabs.creds.json');

const sclOptions = {
  username: saucelabsCreds.user,
  accessKey: saucelabsCreds.key,
  tunnelIdentifier: saucelabsCreds.user,
  verbose: true
};

const sauceConnect = Promise.promisify(sauceConnectLauncher);

let sauceConnectProcess;

exports.connect = function connect() {
  return sauceConnect(sclOptions).then(theProcess => {
    sauceConnectProcess = theProcess;
    console.log("Sauce Connect ready");
  });
};

exports.close = function close() {
  return new Promise(resolve => {
    sauceConnectProcess.close(resolve);
  });
};
