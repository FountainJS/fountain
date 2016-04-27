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
    const result = yield gulp.test();
    unit.unitTests(result);
  });

  it(`should work with interactive options`, function *() {
    const url = yield gulp.serve();
    yield wdio.techsTest(url);
    console.log('End of test');
    gulp.killServe();
    console.log('Server killed');
  });

  it('should run "gulp serve:dist" and e2e on number of Techs listed', function *() {
    console.log(`Running dist test with ${options.framework}, ${options.modules}, ${options.js}`);
    const url = yield gulp.serveDist();
    yield wdio.techsTest(url);
    console.log('End of test');
    gulp.killServe();
    console.log('Server killed');
  });

  it('should run live reload test', function *() {
    const url = yield gulp.serve();
    yield live.liveReload(url, options, fountain);
    console.log('End of test');
    gulp.killServe();
    console.log('Server killed');
  });

  after(function *() {
    yield wdio.close();
    yield sauce.close();
  });
});
