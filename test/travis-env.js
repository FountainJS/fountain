'use strict';

require('co-mocha');
const product = require('cartesian-product');

const gulp = require('./helpers/gulp-helper');
const yeoman = require('./helpers/yeoman-helper');
const wdio = require('./helpers/wdio-helper');
const linter = require('./helpers/linter-helper');
const unit = require('./helpers/unit-helper');

describe('fountain travis-env integration test with saucelabs and webdriver.io', function () {
  this.timeout(0);

  before(function *() {
    yield wdio.init();
  });

  /*
  In .travis.yml define
  ```
  env:
    - FOUNTAIN_FRAMEWORK=react
    - FOUNTAIN_FRAMEWORK=angular2
    - FOUNTAIN_FRAMEWORK=angular1
  ```
  */
  const combinations = product([
    [process.env.FOUNTAIN_FRAMEWORK],
    ['webpack', 'systemjs', 'inject'],
    ['babel', 'js', 'typescript']
  ])
    // Angular 2 and Bower are not supported right now
    .filter(combination => combination[0] !== 'angular2' || combination[1] !== 'inject');

  combinations.forEach(combination => {
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
        yield yeoman.run(options);
      });

      it('should test linter', function *() {
        yield linter.linterTest(options);
      });

      it('should run unit tests', function *() {
        const result = yield gulp.test();
        unit.unitTests(result);
      });

      it('should run "gulp serve" and e2e on number of Techs listed', function *() {
        const url = yield gulp.serve();
        yield wdio.techsTest(url);
        gulp.killServe();
      });

      it('should run "gulp serve:dist" and e2e on number of Techs listed', function *() {
        const url = yield gulp.serveDist();
        yield wdio.techsTest(url);
        gulp.killServe();
      });
    });
  });

  after(function *() {
    yield wdio.close();
  });
});
