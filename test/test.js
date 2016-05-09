'use strict';

require('co-mocha');
const product = require('cartesian-product');

const gulp = require('./helpers/gulp-helper');
const yeoman = require('./helpers/yeoman-helper');
const wdio = require('./helpers/wdio-helper');
const sauce = require('./helpers/saucelabs-helper');
const linter = require('./helpers/linter-helper');
const unit = require('./helpers/unit-helper');
const live = require('./helpers/live-reload-helper');

describe('fountain travis integration test with saucelabs and webdriver.io', function () {
  this.timeout(0);

  before(function *() {
    yield sauce.connect();
    yield wdio.init();
  });

  const combinations = product([
    ['react', 'angular1', 'angular2'],
    ['webpack', 'systemjs', 'inject'],
    ['babel', 'js', 'typescript']
  ])
    // Angular 2 and Bower are not supported right now
    .filter(combination => combination[0] !== 'angular2' || combination[1] !== 'inject');

  combinations.forEach(combination => {
    let fountain;
    const options = {
      framework: combination[0],
      modules: combination[1],
      css: 'scss',
      js: combination[2],
      sample: 'techs'
    };

    describe(`tests with ${options.framework}, ${options.modules}, ${options.js}`, () => {
      before(function *() {
        yield yeoman.prepare();
        fountain = yield yeoman.run(options);
      });

      it('should test linter', function *() {
        yield linter.linterTest(options);
      });

      it('should run "gulp test"', function *() {
        const result = yield gulp.test();
        unit.unitTests(result);
      });

      it('should run "gulp serve" and e2e on number of Techs listed', function *() {
        console.log(`Running test with ${options.framework}, ${options.modules}, ${options.js}`);
        const url = yield gulp.serve();
        yield wdio.techsTest(url);
        yield live.liveReloadJs(options, fountain);
        yield wdio.liveReloadJsTest(url, options);
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
    });
  });

  after(function *() {
    yield wdio.close();
    yield sauce.close();
  });
});
