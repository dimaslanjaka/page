function loadMainScript() {
  require('./analystic');
  require('bootstrap/dist/js/bootstrap.bundle.js');
  require('./r-ads');
}

if (typeof require != 'undefined' && typeof module != 'undefined' && require.main === module) {
  // load script
  loadMainScript();
}

if (typeof module === 'object' && 'exports' in module) {
  module.exports = { loadMainScript };
}
