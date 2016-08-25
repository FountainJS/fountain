const product = require('cartesian-product');

const frameworks = ['react', 'angular1', 'angular2', 'vue'];
const modules = ['webpack', 'systemjs', 'inject'];
const js = ['babel', 'js', 'typescript'];
const css = ['css', 'scss', 'less', 'styl'];
const sample = ['hello', 'techs', 'todoMVC'];

// Angular 2 and Bower are not supported right now
const ng2bowerFilter = combination => combination[0] !== 'angular2' || combination[1] !== 'inject';

// Vue only with Webpack and Babel
const vueWebpackBabel = combination => combination[0] !== 'vue' || (combination[1] === 'webpack' && combination[2] === 'babel');

exports.full = function full() {
  return product([frameworks, modules, js, css, sample])
    .filter(ng2bowerFilter)
    .filter(vueWebpackBabel)
    .map(combination => ({
      framework: combination[0],
      modules: combination[1],
      js: combination[2],
      css: combination[3],
      sample: combination[4],
      router: combination[0] === 'angular1' ? 'uirouter' : 'router',
      ci: []
    }));
};
