const test = require('ava');
const gulp = require('./helpers/gulp-helper');
const yeoman = require('./helpers/yeoman-helper');
const linter = require('./helpers/linter-helper');
const unit = require('./helpers/unit-helper');
const jsdom = require('./helpers/jsdom-helper');

  // const combinations = product([
  //   ['react', 'angular1', 'angular2'],
  //   ['webpack', 'systemjs', 'inject'],
  //   ['babel', 'js', 'typescript']
  // ])
  //   // Angular 2 and Bower are not supported right now
  //   .filter(combination => combination[0] !== 'angular2' || combination[1] !== 'inject');

const combination = ['angular2', 'systemjs', 'babel'];

  // combinations.forEach(combination => {

const options = {
  framework: combination[0],
  modules: combination[1],
  css: 'scss',
  js: combination[2],
  sample: 'techs',
  router: combination[0] === 'angular1' ? 'uirouter' : 'router',
  ci: 'travis'
};

test.before(async () => {
  await yeoman.prepare();
  await yeoman.run(options);
});

const config = `${options.framework}, ${options.modules}, ${options.js}`;

test(`should ${config} test linter`, async () => {
  await linter.linterTest(options);
});

test.serial(`should ${config} run "gulp test"`, async () => {
  const result = await gulp.test();
  unit.unitTests(result);
});

test.serial(`should ${config} run "gulp serve" and e2e on number of Techs listed`, async () => {
  const url = await gulp.serve();
  await jsdom.run(url);
  gulp.killServe();
});

test.serial(`should ${config} run "gulp serve:dist" and e2e on number of Techs listed`, async () => {
  const url = await gulp.serveDist();
  await jsdom.run(url);
  gulp.killServe();
});

// });
