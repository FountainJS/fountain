'use strict';

require('co-mocha');

const gulp = require('./helpers/gulp-helper');
const yeoman = require('./helpers/yeoman-helper');
const wdio = require('./helpers/wdio-helper');
const linter = require('./helpers/linter-helper');
const unit = require('./helpers/unit-helper');

describe('fountain travis integration test with saucelabs and webdriver.io', function () {
  this.timeout(0);

  before(function *() {
    yield wdio.init();
    yield yeoman.prepare();
  });

  const options = {
    framework: process.env.FOUNTAIN_FRAMEWORK,
    modules: process.env.FOUNTAIN_MODULES,
    css: 'scss',
    js: process.env.FOUNTAIN_JS,
    sample: 'techs'
  };

  it(`should test linter on ${options.framework}, ${options.modules}, ${options.js}`, function *() {
    yield yeoman.run(options);
    yield linter.linterTest(options);
  });

  it('should run unit tests', function *() {
    const result = yield gulp.test();
    unit.unitTests(result);
  });

  it(`should work with ${options.framework}, ${options.modules}, ${options.js}`, function *() {
    const url = yield gulp.serve();
    yield wdio.techsTest(url);
    gulp.killServe();
  });

  after(function *() {
    yield wdio.close();
  });
});
