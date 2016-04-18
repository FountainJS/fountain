'use strict';

const expect = require('chai').expect;
const gulp = require('./gulp-helper');

exports.unitTests = function *() {
  const result = yield gulp.test();
  expect(result).to.contain('SUCCESS');
};
