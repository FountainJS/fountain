'use strict';

const co = require('co');
const semver = require('semver');
const utils = require('./utils');

const version = process.argv[process.argv.length - 1];

co(function * publish() {
  try {
    console.log('Checking Git repos...');
    const statusResults = yield utils.execOnEach('git status');
    const uncommitedFiles = statusResults
      .filter(result => {
        return result.result[0].indexOf('nothing to commit') === -1;
      });

    if (uncommitedFiles.length > 0) {
      console.error('There is uncommited files in', uncommitedFiles
        .map(result => result.folder)
        .join(', '));
      return;
    }
    const nonMasterBranch = statusResults
      .filter(result => {
        return result.result[0].indexOf('On branch master\n') === -1;
      });
    if (nonMasterBranch.length > 0) {
      console.error('These repos are not on the master branch:', nonMasterBranch
        .map(result => result.folder)
        .join(', '));
      return;
    }
    const notPushedCommits = statusResults
      .filter(result => {
        return result.result[0].indexOf('Your branch is ahead') > -1;
      });
    if (notPushedCommits.length > 0) {
      console.error('These repos have not pushed commits:', notPushedCommits
        .map(result => result.folder)
        .join(', '));
      return;
    }
    console.log('ok!');

    console.log('Pulling git changes...');
    yield utils.execOnEach(`git pull origin master`);
    console.log('ok!');

    console.log('Checking versions...');
    if (!semver.valid(version)) {
      console.error('Version', version, 'is invalid (semver)');
      return;
    }

    const versions = yield utils.each(folder => {
      return co(utils.readVersion(folder));
    });
    const newerVersions = versions
      .filter(folderVersion => {
        return semver.gt(folderVersion.result, version);
      });

    if (newerVersions.length > 0) {
      console.error('There is newer versions in', newerVersions
        .map(result => result.folder)
        .join(', '));
      return;
    }
    console.log('ok!');

    console.log('Tests ok!');

    console.log('Updating versions in package.json...');
    yield utils.each(folder => {
      return co(utils.updateVersion(folder, version));
    });
    console.log('ok!');

    console.log('Commiting changes in git...');
    yield utils.execOnEach(`git add package.json && git commit -m "bump to version ${version}" && git push`);
    console.log('ok!');

    console.log('Tagging git...');
    yield utils.execOnEach(`git tag v${version} && git push origin v${version}`);
    yield utils.exec(`git tag v${version} && git push origin v${version}`);
    console.log('ok!');

    console.log('Publishing on NPM...');
    yield utils.execOnEach(`npm publish`);
    console.log('ok!');

    console.log(`Everything is ok! ${version} is published on GitHub and NPM!`);
  } catch (error) {
    console.error('Something went wrong', error);
  }
});
