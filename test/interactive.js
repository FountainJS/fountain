'use strict';

require('co-mocha');

const gulp = require('./helpers/gulp-helper');
const yeoman = require('./helpers/yeoman-helper');
const wdio = require('./helpers/wdio-helper');
const sauce = require('./helpers/saucelabs-helper');
const linter = require('./helpers/linter-helper');
const unit = require('./helpers/unit-helper');

describe('fountain interactive integration test with saucelabs and webdriver.io', function () {
  this.timeout(0);

  before(function *() {
    yield sauce.connect();
    yield wdio.init();
    yield yeoman.prepare();
  });

  it(`should test linter on `, function *() {
    const options = yield yeoman.run();
    yield linter.linterTest(options);
  });

  it('should run unit tests', function *() {
    yield unit.unitTests();
  });

  it(`should work with interactive options`, function *() {
    const url = yield gulp.serve();
    yield wdio.techsTest(url);
  });

  after(function *() {
    gulp.killServe();
    yield wdio.close();
    yield sauce.close();
  });
});
