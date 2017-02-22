'use strict';

const jsdom = require('jsdom');
const expect = require('chai').expect;
const spawn = require('cross-spawn');

exports.run = function run(url) {
  return new Promise((resolve, reject) => {
    const result = spawn.sync('node', [`${__dirname}/jsdom-runner`, url], {stdio: 'inherit'});
    if (result.status === 0) {
      console.log('jsdom run success');
      resolve();
    } else {
      console.log('jsdom run failed', result);
      reject();
    }
  });
};

exports.open = function open(url) {
  const virtualConsole = jsdom.createVirtualConsole().sendTo(console);

  virtualConsole.on('jsdomError', error => {
    console.error('jsdom Error', error.stack, error.detail);
  });

  return new Promise((resolve, reject) => {
    jsdom.env({
      url,
      virtualConsole,
      features: {
        FetchExternalResources: ['script'],
        ProcessExternalResources: ['script']
      },
      created(error, window) {
        console.log('jsdom started on URL', url);
        if (error) {
          console.log('jsdom en creation error', error.stack, error.detail);
          reject();
        }
        window.addEventListener('error', event => {
          console.error('Script error', event.error.stack, event.error.detail);
        });
        resolve(window);
      }
    });
  });
};

function wait(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

function waitFor(test, retryTime, attemptsMax) {
  console.log('[WaitFor] First try');
  const firstResult = test();
  if (firstResult.length > 0) {
    return Promise.resolve(firstResult);
  }
  let attempts = 1;
  function oneTry() {
    return wait(retryTime).then(() => {
      console.log('[WaitFor] Try', attempts);
      const result = test();
      if (result.length > 0) {
        return result;
      }
      attempts++;
      if (attempts >= attemptsMax) {
        throw new Error(`[WaitFor] Max attemps reached (${attemptsMax})`);
      }
      return oneTry();
    });
  }
  return oneTry();
}

exports.testTechs = function testTechs(window) {
  return waitFor(() => {
    return window.document.querySelectorAll('h3');
  }, 1000, 20)
    .then(
      elements => {
        expect(elements.length).to.equal(8);
      },
      error => {
        console.log('Test techs error', error.stack, error.detail);
        throw error;
      }
    );
};
