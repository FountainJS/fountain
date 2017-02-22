'use strict';

const spawn = require('cross-spawn');

module.exports = function exec(command, args, options) {
  let process = null;
  const promise = new Promise((resolve, reject) => {
    const spawnOptions = Object.assign({}, {stdio: 'inherit'}, options);
    process = spawn(command, args, spawnOptions);
    process.on('exit', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
  });

  return {process, promise};
};
