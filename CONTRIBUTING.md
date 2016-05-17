# Contributing to FountainJS

You can find here guidelines about how to contribute to FountainJS. This concerns every submodules of the project.

- [Issues](#issues)
- [Installing the environment](#install)
- [Coding Rules](#coding)
- [Pull Requests](#pr)
- [Build Tests](#build)

## <a name="issues"></a>Issues

The simplest way for you to contribute is by creating issues for reporting a bug or asking for a feature.  

### Issue location

- Every issue or feature request should be in the related repository (if your issue concerns `Gulp`, post it in [generator-fountain-gulp](https://github.com/FountainJS/generator-fountain-gulp/issues))  
- If the issue is a general question or a general feature request, you should post it in [generator-fountain-webapp](https://github.com/FountainJS/generator-fountain-webapp/issues)
- As a contributor, you might want to post issue about the coding environment. If so, you can post it in the meta-repo [fountain](https://github.com/FountainJS/fountain/issues)

### Issue template

The issue should contain the details about your configuration at the moment you met the bug.

- If you had a bug related to a generated project, please provide the framework, language and modules manager
- Specify the version of the generator(s) you are using
- If relevant, provide Node/npm version and specify your OS
- In order to easily reproduce the bug, you should provide a replication project (Github, Plunker...)

In any case, every issue must follow this template: 
> #### Configuration
A clear description of the configuration of the project(s) you met the issue in

> #### Version
Version of the generator(s) you are using

> #### Node/NPM/OS versions

> #### Expected and current behaviors
Explain what is wrong in the actual behavior and how you'd expect it to be

> #### How to reproduce the bug
You can link a Github project, https://plnkr.co or something else.

> #### Other information

## <a name="install"></a>Environment

### FountainJS generator is divided into multiple sub-generator.  

- As a user, the main entry point is [generator-fountain-webapp](https://github.com/FountainJS/generator-fountain-webapp).  
- As a developer, the main entry point is [fountain](https://github.com/FountainJS/fountain).It is a meta-repo containing submodules. Each of them is a generator for a specific feature (gulp, angular1...). You can find the full list [here](https://github.com/FountainJS/fountain/blob/master/.gitmodules). Every commit of fountain repo is linked to a specific commit of every submodule.

If you want to know more about submodules, https://git-scm.com/book/en/v2/Git-Tools-Submodules

### Installing

In order to install the full environment on your local machine. You have to do the following: 

```sh
$ git clone git@github.com:FountainJS/fountain.git
$ cd fountain
$ npm install
$ git submodule update --init --recursive
```

The last command will clone every submodule.  
Then you need to link every submodule between each other.

```sh
$ npm run linkAll 
```

This will also run `npm install` inside each submodule repo. 

### Tests
We provide end-to-end tests. You can find them in `fountain/test/test.js`.  
This contains a series of test executed on every combinations of generated project. You can also choose the stack you want to run the tests on by using `fountain/test/interactive.js`. 

```sh
$ mocha test/test 
```

or 

```sh
$ mocha test/interactive 
```

The following tests are executed on the generated project: 

- lint the project (both source code and configuration code) regarding its linting rules
- run project unit tests
- run `gulp serve` and
	- test if the list of techs is displayed
	- test live reload for JS files
	- test live reload for css/scss/less files
- run `gulp serve:dist` and test if the list of techs is displayed

Tests are ran by Mocha and we use [Saucelabs](http://saucelabs.com/) and [WebdriverIO](http://webdriver.io/) for remote browser tests.

## <a name="coding"></a> Coding rules

### Ecmascript

In every submodule of FountainJS you can use ES2015 syntax. You can find more about it here https://babeljs.io/docs/learn-es2015/.  
However, **the code has to be compatible with Node 4 minimum**. If you are using Node 5, we strongly encourage you using `nvm` and test your code on Node 4 as well. You can find which ES2015 features you can use or not here http://node.green/

### Linting rules

We use ESLint as style linter with a shared configuration using [XO](https://github.com/sindresorhus/xo) rules. Please follow this syntax otherwise build tests won't pass. 
XO configuration is set in `package.json` as an extension of eslint. The generated projects may use additional plugins such as `eslint-config-xo-react`. We use the `space` version of XO which uses 2-space indent.

### Coding style

You are encouraged to follow the coding style of the whole project to keep consistency.


## <a name="pr"></a> Pull Requests

If you want to propose a fix or a feature, do as follow: 

- Fork the generator
- Open a pull request describing the fix/feature
- Reference the issue when appropriate
- Make sure your branch can be automatically merged, otherwise rebase your branch
- Make sure Travis tests are green

### Pull Request template

In any case, every pull request must follow this template: 

> #### Please check if the PR fulfills these requirements  
  - [ ] Travis tests for the changes are green for the meta-repo  
  - [ ] Travis tests for the changes are green for the repository you contribute to

> #### Changes
What kind of change does this PR introduce ? (Bug fix, feature, docs update, ...)

> #### Current behavior
What is the current behavior ? (You can also link to an open issue here)

> #### New behavior
What is the new behavior (if this is a feature change) ?

> #### Does this PR introduce a breaking change ?
What changes might users need to make in their application due to this PR ?

> #### Other information


## <a name="build"></a> Build tests

We use Travis for running tests before merging pull requests. Locally, you can run the same tests using `mocha test/test`. Pull requests will not be merged if the build is not green.   
