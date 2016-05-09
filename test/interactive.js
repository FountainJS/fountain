'use strict';

require('co-mocha');

const gulp = require('./helpers/gulp-helper');
const yeoman = require('./helpers/yeoman-helper');
const wdio = require('./helpers/wdio-helper');
const sauce = require('./helpers/saucelabs-helper');
const linter = require('./helpers/linter-helper');
const unit = require('./helpers/unit-helper');
const live = require('./helpers/live-reload-helper');

describe('fountain interactive integration test with saucelabs and webdriver.io', function () {
  this.timeout(0);
  let fountain;
  let options;

  before(function *() {
    yield sauce.connect();
    yield wdio.init();
    yield yeoman.prepare();
  });

  it(`should test linter on `, function *() {
    fountain = yield yeoman.run();
    options = fountain.props;
    yield linter.linterTest(options);
  });

  it('should run unit tests', function *() {
    const result = yield gulp.test();
    unit.unitTests(result);
  });

  it(`should work with interactive options`, function *() {
    const url = yield gulp.serve();
    yield wdio.techsTest(url);
    yield live.liveReloadJs(options, fountain);
    yield wdio.liveReloadJsTest(url);
    yield live.removeChanges(options, fountain);
    yield live.liveReloadCss(options, fountain);
    yield wdio.liveReloadCssTest(url);
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

  after(function *() {
    yield wdio.close();
    yield sauce.close();
  });
});
