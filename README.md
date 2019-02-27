# :warning: Unmaintained

This project has been **archived** and is considered **outdated** and **unmaintained**.

With the massive rise of the CLI tools by each major JavaScript Web frameworks, it was become irrelevant to pursue the quest of being a competitive project scaffolder for modern Web project.

We officialy advise to use the coresponding CLI tools for the framework you use:

- [create-react-app](https://github.com/facebook/create-react-app) for [React](https://reactjs.org/)
- [Vue CLI](https://cli.vuejs.org/) for [Vue.js](https://vuejs.org/)
- [Angular CLI](https://cli.angular.io/) for [Angular](https://angular.io/)

Of course, we have some regrets regarding our users, Yeoman users and some goals we had with Fountain (like giving important tool choices to users, harmonizing projects configurations between frameworks...) but still, you can use official CLI tools with confidence as they are great project which went further for development experience and Web optimization.

# meta-fountain
[![Build Status](https://travis-ci.org/FountainJS/fountain.svg?branch=master)](https://travis-ci.org/FountainJS/fountain)
> Meta repository for a sweet development

## Install

```sh
$ git clone git@github.com:FountainJS/fountain.git
$ cd fountain
$ npm install
```

## Get submodules

```sh
$ git submodule update --init --recursive
```

## Link all dependencies

```sh
$ npm run linkAll
```

## Test

```sh
$ npm test
```

## Submodules status
| Submodule     | Status        | Coverage      | Dependencies  |
| ------------- |:-------------:|:-------------:|:-------------:|
| [fountain-generator](https://github.com/FountainJS/fountain-generator)                         | [![Build Status](https://travis-ci.org/FountainJS/fountain-generator.svg?branch=master)](https://travis-ci.org/FountainJS/fountain-generator)                         | [![CodeCov](https://codecov.io/gh/FountainJS/fountain-generator/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/fountain-generator)                         | [![Dependency Status](https://david-dm.org/FountainJS/fountain-generator.svg)](https://david-dm.org/FountainJS/fountain-generator)                         |
| [generator-fountain-angular1](https://github.com/FountainJS/generator-fountain-angular1)       | [![Build Status](https://travis-ci.org/FountainJS/generator-fountain-angular1.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-angular1)       | [![CodeCov](https://codecov.io/gh/FountainJS/generator-fountain-angular1/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-angular1)       | [![Dependency Status](https://david-dm.org/FountainJS/generator-fountain-angular1.svg)](https://david-dm.org/FountainJS/generator-fountain-angular1)       |
| [generator-fountain-angular2](https://github.com/FountainJS/generator-fountain-angular2)       | [![Build Status](https://travis-ci.org/FountainJS/generator-fountain-angular2.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-angular2)       | [![CodeCov](https://codecov.io/gh/FountainJS/generator-fountain-angular2/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-angular2)       | [![Dependency Status](https://david-dm.org/FountainJS/generator-fountain-angular2.svg)](https://david-dm.org/FountainJS/generator-fountain-angular2)       |
| [generator-fountain-browsersync](https://github.com/FountainJS/generator-fountain-browsersync) | [![Build Status](https://travis-ci.org/FountainJS/generator-fountain-browsersync.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-browsersync) | [![CodeCov](https://codecov.io/gh/FountainJS/generator-fountain-browsersync/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-browsersync) | [![Dependency Status](https://david-dm.org/FountainJS/generator-fountain-browsersync.svg)](https://david-dm.org/FountainJS/generator-fountain-browsersync) |
| [generator-fountain-eslint](https://github.com/FountainJS/generator-fountain-eslint)           | [![Build Status](https://travis-ci.org/FountainJS/generator-fountain-eslint.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-eslint)           | [![CodeCov](https://codecov.io/gh/FountainJS/generator-fountain-eslint/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-eslint)           | [![Dependency Status](https://david-dm.org/FountainJS/generator-fountain-eslint.svg)](https://david-dm.org/FountainJS/generator-fountain-eslint)           |
| [generator-fountain-gulp](https://github.com/FountainJS/generator-fountain-gulp)               | [![Build Status](https://travis-ci.org/FountainJS/generator-fountain-gulp.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-gulp)               | [![CodeCov](https://codecov.io/gh/FountainJS/generator-fountain-gulp/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-gulp)               | [![Dependency Status](https://david-dm.org/FountainJS/generator-fountain-gulp.svg)](https://david-dm.org/FountainJS/generator-fountain-gulp)               |
| [generator-fountain-inject](https://github.com/FountainJS/generator-fountain-inject)           | [![Build Status](https://travis-ci.org/FountainJS/generator-fountain-inject.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-inject)           | [![CodeCov](https://codecov.io/gh/FountainJS/generator-fountain-inject/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-inject)           | [![Dependency Status](https://david-dm.org/FountainJS/generator-fountain-inject.svg)](https://david-dm.org/FountainJS/generator-fountain-inject)           |
| [generator-fountain-karma](https://github.com/FountainJS/generator-fountain-karma)             | [![Build Status](https://travis-ci.org/FountainJS/generator-fountain-karma.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-karma)             | [![CodeCov](https://codecov.io/gh/FountainJS/generator-fountain-karma/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-karma)             | [![Dependency Status](https://david-dm.org/FountainJS/generator-fountain-karma.svg)](https://david-dm.org/FountainJS/generator-fountain-karma)             |
| [generator-fountain-react](https://github.com/FountainJS/generator-fountain-react)             | [![Build Status](https://travis-ci.org/FountainJS/generator-fountain-react.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-react)             | [![CodeCov](https://codecov.io/gh/FountainJS/generator-fountain-react/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-react)             | [![Dependency Status](https://david-dm.org/FountainJS/generator-fountain-react.svg)](https://david-dm.org/FountainJS/generator-fountain-react)             |
| [generator-fountain-systemjs](https://github.com/FountainJS/generator-fountain-systemjs)       | [![Build Status](https://travis-ci.org/FountainJS/generator-fountain-systemjs.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-systemjs)       | [![CodeCov](https://codecov.io/gh/FountainJS/generator-fountain-systemjs/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-systemjs)       | [![Dependency Status](https://david-dm.org/FountainJS/generator-fountain-systemjs.svg)](https://david-dm.org/FountainJS/generator-fountain-systemjs)       |
| [generator-fountain-tslint](https://github.com/FountainJS/generator-fountain-tslint)           | [![Build Status](https://travis-ci.org/FountainJS/generator-fountain-tslint.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-tslint)           | [![CodeCov](https://codecov.io/gh/FountainJS/generator-fountain-tslint/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-tslint)           | [![Dependency Status](https://david-dm.org/FountainJS/generator-fountain-tslint.svg)](https://david-dm.org/FountainJS/generator-fountain-tslint)           |
| [generator-fountain-vue](https://github.com/FountainJS/generator-fountain-vue)                 | [![Build Status](https://travis-ci.org/FountainJS/generator-fountain-vue.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-vue)                 | [![CodeCov](https://codecov.io/gh/FountainJS/generator-fountain-vue/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-vue)           | [![Dependency Status](https://david-dm.org/FountainJS/generator-fountain-webapp.svg)](https://david-dm.org/FountainJS/generator-fountain-webapp)           |
| [generator-fountain-webapp](https://github.com/FountainJS/generator-fountain-webapp)           | [![Build Status](https://travis-ci.org/FountainJS/generator-fountain-webapp.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-webapp)           | [![CodeCov](https://codecov.io/gh/FountainJS/generator-fountain-webapp/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-webapp)           | [![Dependency Status](https://david-dm.org/FountainJS/generator-fountain-webapp.svg)](https://david-dm.org/FountainJS/generator-fountain-webapp)           |
| [generator-fountain-webpack](https://github.com/FountainJS/generator-fountain-webpack)         | [![Build Status](https://travis-ci.org/FountainJS/generator-fountain-webpack.svg?branch=master)](https://travis-ci.org/FountainJS/generator-fountain-webpack)         | [![CodeCov](https://codecov.io/gh/FountainJS/generator-fountain-webpack/branch/master/graph/badge.svg)](https://codecov.io/gh/FountainJS/generator-fountain-webpack)         | [![Dependency Status](https://david-dm.org/FountainJS/generator-fountain-webpack.svg)](https://david-dm.org/FountainJS/generator-fountain-wepack)          |
