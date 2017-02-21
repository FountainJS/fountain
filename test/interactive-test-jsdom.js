'use strict';

require('co-mocha');

const gulp = require('./helpers/gulp-helper');
const yeoman = require('./helpers/yeoman-helper');
const linter = require('./helpers/linter-helper');
const unit = require('./helpers/unit-helper');
const jsdom = require('./helpers/jsdom-helper');

describe('fountain interactive integration test with jsdom', function () {
  this.timeout(0);

  before(function * () {
    yield yeoman.prepare();
  });

  it(`should test linter on `, function * () {
    const options = yield yeoman.run();
    yield linter.linterTest(options);
  });

  it('should run unit tests', function * () {
    const result = yield gulp.test();
    unit.unitTests(result);
  });

  it('should run "gulp serve" and e2e on number of Techs listed', function * () {
    const url = yield gulp.serve();
    yield jsdom.run(url);
    gulp.killServe();
  });

  it('should run "gulp serve:dist" and e2e on number of Techs listed', function * () {
    const url = yield gulp.serveDist();
    yield jsdom.run(url);
    gulp.killServe();
  });
});
