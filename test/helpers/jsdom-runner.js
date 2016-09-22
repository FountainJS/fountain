const jsdom = require('./jsdom-helper');

jsdom.open(process.argv[2])
  .then(window => jsdom.testTechs(window))
  .then(
    () => process.exit(0),
    error => {
      console.log('jsdom runner failed', error.stack, error.detail);
      process.exit(1);
    }
  );
