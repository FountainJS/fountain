const jsdom = require('jsdom');
const expect = require('chai').expect;

const virtualConsole = jsdom.createVirtualConsole().sendTo(console);

exports.open = function open(url) {
  return new Promise((resolve, reject) => {
    jsdom.env({
      url,
      virtualConsole,
      features: {
        FetchExternalResources: ["script", "iframe"],
        ProcessExternalResources: ["script"]
      },
      created(error, window) {
        console.log('inside jsdom');
        if (error) {
          reject(error);
        }
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

function waitFor(test, retryTime, attempsMax) {
  const firstResult = test();
  if (firstResult.length > 0) {
    return Promise.resolve(firstResult);
  }
  let attemps = 1;
  function oneTry() {
    return wait(retryTime).then(() => {
      const result = test();
      if (result.length > 0) {
        return result;
      }
      attemps++;
      console.log('nop...', attemps);
      if (attemps >= attempsMax) {
        throw new Error('max attemps reached');
      }
      return oneTry();
    });
  }
  console.log('try');
  return oneTry();
}

exports.testTechs = function testTechs(window) {
  return waitFor(() => {
    return window.document.querySelectorAll('h3');
  }, 1000, 10).then(elements => {
    console.log('trop bien', elements);
    expect(elements.length).to.equal(8);
  }).catch(error => {
    console.log('too bad', error);
  });
};
