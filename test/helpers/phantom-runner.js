/* eslint-disable */
"use strict";
const args = require('system').args;
const page = require('webpage').create();
const url = args[1];

page.open(url, status => {
  if (status === 'success') {
    waitFor(() => {
      return page.evaluate(() => {
        return document.getElementsByTagName('h3').length === 8;
      });
    }, phantom.exit, 10000);
  } else {
    console.log('Unable to access network');
    throw new Error('Unable to access network');
    phantom.exit(1);
  }
});

function waitFor(testFx, onReady, timeOutMillis) {
  const maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000;
  const start = new Date().getTime();
  let condition = false;
  const interval = setInterval(() => {
    if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) {
      condition = (typeof (testFx) === 'string' ? eval(testFx) : testFx());
    } else if (condition) {
      if (typeof onReady === 'string') {
        eval(onReady);
      } else {
        onReady();
      }
      clearInterval(interval);
    } else {
      console.log('Not found');
      phantom.exit(1);
    }
  }, 250);
}
