var builtPaths = __karma__.config.builtPaths;

Error.stackTraceLimit            = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

if (! builtPaths)
  throw new Error('Please specify built paths in the Karma configuration file');

var toServeingPath = function(p) { return '/base/'+p;};
builtPaths = builtPaths.map(toServeingPath);

__karma__.loaded = function () { };

function isSpecFile(path) {
  return /\.spec\.(.*\.)?js$/.test(path);
}
function isBuiltFile(path) {
  function isJsFile(path) {
    return path.slice(-3) == '.js';
  }

  return isJsFile(path) &&
    builtPaths.reduce(function(keep, bp) {
      return keep || (path.substr(0, bp.length) === bp);
    }, false);
}
var specs = Object.keys(window.__karma__.files).filter(isSpecFile).filter(isBuiltFile);

System.config({
  baseURL: 'base/src'
, map: {
  'factory/fake.http': 'factory/fake.http.js'
, 'factory/opportunity/opportunity.fixture': 'factory/opportunity/opportunity.fixture.js'
, 'factory/share/share.fixture': 'factory/share/share.fixture.js'
}

});

System.import('systemjs.config.js').then(runTests);

function importPromises(imports) {
  var toImport = function (moduleName) {
    return System.import(moduleName);
  }
  const specImports = imports.map(toImport);
  return Promise.all(specImports);
}

function runTests() {
  const importsPromise = importPromises(specs);
  return importsPromise.then(__karma__.start, __karma__.error);
}
