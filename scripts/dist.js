'use strict';

const path = require('path');
const co = require('co');
const helpers = require('yeoman-test');
const mkdirp = require('mkdirp-promise');
const rimraf = require('rimraf-promise');
const Promise = require('bluebird');

const output = require('./helpers/mute');
const combinations = require('./helpers/combinations');
const zip = require('./helpers/zip');

const generatorPath = path.join(__dirname, '../generator-fountain-webapp/generators/app');

co(function * dist() {
  try {
    yield rimraf(path.join(__dirname, `../dist`));

    for (const options of combinations.full()) {
      const combinationPath = path.join(__dirname, `../dist/${options.framework}-${options.modules}-${options.js}-${options.css}-${options.router}-${options.sample}`);
      yield mkdirp(combinationPath);
      const fountain = helpers.createGenerator('fountain-webapp:app', [generatorPath], null, {
        'skipInstall': true,
        'skip-welcome-message': true
      });
      fountain.env.cwd = combinationPath;
      helpers.mockPrompt(fountain, options);
      const run = Promise.promisify(fountain.run.bind(fountain));
      output.mute();
      yield run();
      output.unmute();
      yield zip.zipFolder(combinationPath, `${combinationPath}.zip`);
      console.log('Generated', combinationPath);
    }
  } catch (error) {
    console.log('Something went wrong', error);
  }
});
