const co = require('co');
const path = require('path');

const exec = require('../exec');

const cwd = path.join(__dirname, '../..');

try {
  co(function * deploy() {
    if (!process.env.TRAVIS_TAG || !/.*\.1/.test(process.env.TRAVIS_JOB_NUMBER)) {
      console.log('Deploy on GitHub only on tags and first build');
      return;
    }

    console.log('Deploying to GitHub for', process.env.TRAVIS_JOB_NUMBER, 'tag', process.env.TRAVIS_TAG);

    yield exec('node', ['scripts/dist'], {cwd}).promise;
    yield exec('node', ['scripts/upload'], {cwd}).promise;
  });
} catch (error) {
  console.log('Something went wrong', error);
}
