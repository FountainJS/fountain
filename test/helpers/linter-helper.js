'use strict';

const expect = require('chai').expect;
const path = require('path');
const globby = require('globby');
const fs = require('mz/fs');
const CLIEngine = require('eslint').CLIEngine;
const cli = new CLIEngine({});
const Linter = require('tslint').Linter;
const workPath = path.join(__dirname, '../../test/work');

exports.linterTest = function *(options) {
  exports.eslint();
  if (options.js === 'typescript') {
    yield exports.tslint(options.framework);
  }
};

exports.eslint = () => {
  const sources = [`${workPath}/conf/**/*.js`, `${workPath}/gulp_tasks/**/*.js`, `${workPath}/src/**/*.js`];
  const report = cli.executeOnFiles(sources);
  const formatter = cli.getFormatter();
  console.log(formatter(report.results));

  expect(report.errorCount).to.equal(0);
};

exports.tslint = function *(framework) {
  const extension = framework === 'react' ? 'tsx' : 'ts';
  const paths = yield globby([`${workPath}/src/**/*.${extension}`]);
  const tslintConf = yield fs.readFile(`${workPath}/tslint.json`);
  const configuration = JSON.parse(tslintConf);
  const options = {
    formatter: 'json'
  };
  let failureCount = 0;
  for (const path of paths) {
    const contents = yield fs.readFile(path, 'utf8');
    const linter = new Linter(options);
    linter.lint(path, contents, configuration);
    const result = linter.getResult();
    failureCount += result.failureCount;
  }
  expect(failureCount).to.equal(0);
};
