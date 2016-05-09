'use strict';

const fs = require('mz/fs');
const path = require('path');
const workPath = path.join(__dirname, '../../test/work');

exports.liveReloadJs = function *(options, fountain) {
  const extensions = fountain.getExtensions(options);
  const filePath = options.framework === 'angular1' ? `src/app/techs/techs.${extensions.js}` : `src/app/header.${extensions.js}`;
  const oldFile = yield fs.readFile(path.join(workPath, filePath), 'utf8');
  const result = options.framework === 'angular1' ? oldFile.replace(/(vm|this).techs = (.*?;)/, `$1.techs = \[{logo: '', title: '', text1: '', text2: ''}];`) : oldFile.replace(/Fountain Generator/g, 'Travis');
  yield fs.writeFile(filePath, result, 'utf8');
};

exports.removeChanges = function *(options, fountain) {
  const extensions = fountain.getExtensions(options);
  const filePath = options.framework === 'angular1' ? `src/app/techs/techs.${extensions.js}` : `src/app/header.${extensions.js}`;
  const oldFile = yield fs.readFile(path.join(workPath, filePath), 'utf8');
  const result = options.js === 'typescript' ? oldFile.replace(/(vm|this).techs = \[{logo: '', title: '', text1: '', text2: ''}];/, '$1.techs = response.data as Tech[];') : oldFile.replace(/(vm|this).techs = \[{logo: '', title: '', text1: '', text2: ''}];/, '$1.techs = response.data;');
  yield fs.writeFile(filePath, result, 'utf8');
};

exports.liveReloadCss = function *(options, fountain) {
  const extensions = fountain.getExtensions(options);
  const filePath = path.join(workPath, `src/index.${extensions.css}`);
  const oldFile = yield fs.readFile(filePath, 'utf8');
  const result = oldFile.replace(/color: black/g, 'color: red');
  yield fs.writeFile(filePath, result, 'utf8');
};
