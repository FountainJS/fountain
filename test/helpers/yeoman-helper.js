'use strict';

const path = require('path');
const _ = require('lodash');
const co = require('co');
const helpers = require('yeoman-test');
const Promise = require('bluebird');
const mkdirp = require('mkdirp-promise');
const fs = require('mz/fs');

const generatorPath = path.join(__dirname, '../../generator-fountain-webapp/generators/app');
const workPath = path.join(__dirname, '../../test/work');
const depsPath = path.join(__dirname, '../../test/deps');
const packageFolders = ['node_modules', 'bower_components'];

const testDirectory = Promise.promisify(helpers.testDirectory);

let fountain;

exports.prepare = function prepare() {
  fountain = helpers.createGenerator('fountain-webapp:app', [generatorPath], null);
  fountain.env.cwd = workPath;

  return co(function * () {
    yield testDirectory(workPath);
    fountain.fs.delete(`${workPath}/package.json`);
    yield mkdirp(depsPath);
    yield packageFolders.map(folder => mkdirp(path.join(depsPath, folder)));
    yield packageFolders.map(folder => fs.symlink(`../deps/${folder}`, folder));
    return fountain;
  });
};

exports.run = function run(prompts) {
  if (_.isObject(prompts)) {
    helpers.mockPrompt(fountain, prompts);
  }

  const run = Promise.promisify(fountain.run.bind(fountain));
  return co(function * () {
    yield run();
    return fountain;
  });
};
