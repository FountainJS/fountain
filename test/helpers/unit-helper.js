'use strict';

const expect = require('chai').expect;

exports.unitTests = function (result) {
  expect(result).to.contain('SUCCESS');
};
