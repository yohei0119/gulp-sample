const minimist = require('minimist');
const envOption = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
};
const options = minimist(process.argv.slice(2), envOption);
// package.jsonのenvを調べてbool値を返す production: true development: false
const mode = (options.env === 'production') ? true : false;

module.exports = {
  mode: mode
};